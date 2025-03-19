import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-toppromotions',
  templateUrl: './toppromotions.component.html',
  styleUrls: ['./toppromotions.scss']
})
export class ToppromotionsComponent implements OnInit {

  total_count: number = 0;
  rows: any = [];
  rows1: any = [];
  expanded: any = {};
  timeout: any;
  ColumnMode = ColumnMode;
  typeSelected = 'ball-fussion';
  @ViewChild('myTable') table: any;

  showCreateFrom: boolean = false;
  firstCollapse: boolean = true;

  toppromotionsIdToBeEdited: any = {};

  categories: any[] = [];
  errorResponse: any;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  selectedFile: any = null;
  isImage1Uploading: boolean = false
  isImage2Uploading: boolean = false;
  fieldsValidation: boolean = false
  links: any = []
  selectedRole: any[] = [];

  @ViewChild("myckeditor") ckeditor: any;
  ckeConfig: any
  public editor = ClassicEditor;
  config = { }


  constructor(
    private _NewsService: NewsService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllWebsite()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }

  clearFields() {
    this.toppromotionsIdToBeEdited.id = ''
    this.toppromotionsIdToBeEdited.heading = '',
    this.toppromotionsIdToBeEdited.description = '',
    this.toppromotionsIdToBeEdited.links = '',
    this.toppromotionsIdToBeEdited.images = []
    this.toppromotionsIdToBeEdited.type = ''
    this.links = []
    this.toppromotionsIdToBeEdited.timeForReadingMinutes = ''
  }

  getAllWebsite() {
    this.spinnerService.show();
    this._NewsService.getAllByType('TOP_PROMOTION').subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        this.rows = response.object.content;
        this.total_count = this.rows.length;
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.toppromotionsIdToBeEdited = employee;
    this.links = this.toppromotionsIdToBeEdited.links
  }

  createWebsite() {
    this.spinnerService.show();
    this.toppromotionsIdToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.toppromotionsIdToBeEdited.links[i] != this.links[i]) {
        this.toppromotionsIdToBeEdited.links.push(this.links[i])
      }
    }

    this.toppromotionsIdToBeEdited = {
      "heading": this.toppromotionsIdToBeEdited.heading,
      "description": this.toppromotionsIdToBeEdited.description,
      "links": this.toppromotionsIdToBeEdited.links,
      "images": this.toppromotionsIdToBeEdited.images,
      "type": "TOP_PROMOTION",
      "timeForReadingMinutes": this.toppromotionsIdToBeEdited.timeForReadingMinutes //this variable used to save details of website
    }

    console.log("toppromotionsIdToBeEdited", this.toppromotionsIdToBeEdited)

    this._NewsService.post(this.toppromotionsIdToBeEdited).subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();

        Swal.fire(
          'Success',
          response.message,
          'success'
        )
        this.ngOnInit()
        this.createForm()
      } else {
        this.spinnerService.hide();
        Swal.fire(
          'Error',
          response.message,
          'error'
        )
      }
    }, error => {
      this.errorResponse = error
      Swal.fire(
        'Error',
        this.errorResponse,
        'error'
      )
    })
  }

  updateWebsite() {
    this.spinnerService.show();
    this.toppromotionsIdToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.toppromotionsIdToBeEdited.links[i] != this.links[i]) {
        this.toppromotionsIdToBeEdited.links.push(this.links[i])
      }
    }

    this.toppromotionsIdToBeEdited = {
      "id": this.toppromotionsIdToBeEdited.id,
      "heading": this.toppromotionsIdToBeEdited.heading,
      "description": this.toppromotionsIdToBeEdited.description,
      "links": this.toppromotionsIdToBeEdited.links,
      "images": this.toppromotionsIdToBeEdited.images,
      "type": "TOP_PROMOTION",
      "timeForReadingMinutes": this.toppromotionsIdToBeEdited.timeForReadingMinutes
    }

    console.log("toppromotionsIdToBeEdited", this.toppromotionsIdToBeEdited)

    this._NewsService.put(this.toppromotionsIdToBeEdited).subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        Swal.fire(
          'Success',
          response.message,
          'success'
        )
        this.ngOnInit()
        this.createForm()
      } else {
        this.spinnerService.hide();
        Swal.fire(
          'Error',
          response.message,
          'error'
        )
      }
    }, error => {
      this.errorResponse = error
      Swal.fire(
        'Error',
        this.errorResponse,
        'error'
      )
    })
  }

  onUpload(type: any) {
    this.spinnerService.show();
    this._NewsService.uploadImage(this.selectedFile).subscribe(response => {
      console.log({ response: response });
      this.spinnerService.hide();
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "image1") {
            this.toppromotionsIdToBeEdited.images[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.toppromotionsIdToBeEdited", this.toppromotionsIdToBeEdited)
          } else if (type == "image2") {
            this.toppromotionsIdToBeEdited.images[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.toppromotionsIdToBeEdited", this.toppromotionsIdToBeEdited)
          }
        } else {
          this.spinnerService.hide();
          this.isImage1Uploading = false;
          this.isImage2Uploading = false;
          Swal.fire(
            'Error',
            imageResponse.message,
            'error'
          )
        }
      }, error => {
        this.isImage1Uploading = false;
        this.isImage2Uploading = false;
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        )
      })
  }

  onFileChanged(event: any, type: any) {
    let file = event.target.files[0];
    this.selectedFile = file
    if (type == "image1") {
      this.isImage1Uploading = true
    } else if (type == "image2") {
      this.isImage2Uploading = true;
    }
    this.onUpload(type);
  }

  onError(event: any) {
    event.target.src = '../../assets/images/logo.png';
  }

  onPaste(_event:any) {

  }
  onChange(_event:any) {
    
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '800px',
      height: '600px'
  });
  }

  openDialogWithTemplateRefDescription(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '800px',
      height: '600px'
  });
  }
}