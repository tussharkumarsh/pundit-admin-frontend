import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.scss']
})
export class BannerComponent implements OnInit {

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

  bannerIdToBeEdited: any = {};

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
  bannerUrls: any = []
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
    this.bannerIdToBeEdited.id = ''
    this.bannerIdToBeEdited.bannerImages = []
    this.bannerIdToBeEdited.type = ''
    this.bannerUrls = []
  }

  getAllWebsite() {
    this.spinnerService.show();
    this._NewsService.getAllByType('BANNER').subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        this.rows = response.object.content;
        this.total_count = this.rows.length;
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.bannerIdToBeEdited = employee;
    this.bannerUrls = this.bannerIdToBeEdited.bannerUrls
  }

  createBanner() {
    this.spinnerService.show();
    this.bannerIdToBeEdited.bannerUrls = []
    for (let i = 0; i < this.bannerUrls.length; i++) {
      if (this.bannerIdToBeEdited.bannerUrls[i] != this.bannerUrls[i]) {
        this.bannerIdToBeEdited.bannerUrls.push(this.bannerUrls[i])
      }
    }

    this.bannerIdToBeEdited = {
      "bannerUrls": this.bannerIdToBeEdited.bannerUrls,
      "bannerImages": this.bannerIdToBeEdited.bannerImages,
      "type": "BANNER",
    }

    console.log("bannerIdToBeEdited", this.bannerIdToBeEdited)

    this._NewsService.post(this.bannerIdToBeEdited).subscribe((response: any) => {
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

  updateBanner() {
    this.spinnerService.show();
    this.bannerIdToBeEdited.bannerUrls = []
    for (let i = 0; i < this.bannerUrls.length; i++) {
      if (this.bannerIdToBeEdited.bannerUrls[i] != this.bannerUrls[i]) {
        this.bannerIdToBeEdited.bannerUrls.push(this.bannerUrls[i])
      }
    }

    this.bannerIdToBeEdited = {
      "id": this.bannerIdToBeEdited.id,
      "bannerUrls": this.bannerIdToBeEdited.bannerUrls,
      "bannerImages": this.bannerIdToBeEdited.bannerImages,
      "type": "BANNER",
    }

    console.log("bannerIdToBeEdited", this.bannerIdToBeEdited)

    this._NewsService.put(this.bannerIdToBeEdited).subscribe((response: any) => {
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
            this.bannerIdToBeEdited.bannerImages[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.bannerIdToBeEdited", this.bannerIdToBeEdited)
          } else if (type == "image2") {
            this.bannerIdToBeEdited.bannerImages[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.bannerIdToBeEdited", this.bannerIdToBeEdited)
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
}