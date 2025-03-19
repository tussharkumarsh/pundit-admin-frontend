import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokerrooms',
  templateUrl: './pokerrooms.component.html',
  styleUrls: ['./pokerrooms.scss']
})
export class PokerroomsComponent implements OnInit {

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

  pokerroomsIdToBeEdited: any = {};

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
    this.pokerroomsIdToBeEdited.id = ''
    this.pokerroomsIdToBeEdited.heading = '',
    this.pokerroomsIdToBeEdited.description = '',
    this.pokerroomsIdToBeEdited.links = '',
    this.pokerroomsIdToBeEdited.images = []
    this.pokerroomsIdToBeEdited.type = ''
    this.links = []
    this.pokerroomsIdToBeEdited.timeForReadingMinutes = ''
  }

  getAllWebsite() {
    this.spinnerService.show();
    this._NewsService.getAllByType('POKER_ROOM').subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        this.rows = response.object.content;
        this.total_count = this.rows.length;
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.pokerroomsIdToBeEdited = employee;
    this.links = this.pokerroomsIdToBeEdited.links
  }

  createWebsite() {
    this.spinnerService.show();
    this.pokerroomsIdToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.pokerroomsIdToBeEdited.links[i] != this.links[i]) {
        this.pokerroomsIdToBeEdited.links.push(this.links[i])
      }
    }

    this.pokerroomsIdToBeEdited = {
      "heading": this.pokerroomsIdToBeEdited.heading,
      "timeForReadingMinutes": this.pokerroomsIdToBeEdited.timeForReadingMinutes, //this variable used to save sub heading of poker rooms
      "description": this.pokerroomsIdToBeEdited.description,
      "links": this.pokerroomsIdToBeEdited.links,
      "images": this.pokerroomsIdToBeEdited.images,
      "type": "POKER_ROOM",
    }

    console.log("pokerroomsIdToBeEdited", this.pokerroomsIdToBeEdited)

    this._NewsService.post(this.pokerroomsIdToBeEdited).subscribe((response: any) => {
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
    this.pokerroomsIdToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.pokerroomsIdToBeEdited.links[i] != this.links[i]) {
        this.pokerroomsIdToBeEdited.links.push(this.links[i])
      }
    }

    this.pokerroomsIdToBeEdited = {
      "id": this.pokerroomsIdToBeEdited.id,
      "heading": this.pokerroomsIdToBeEdited.heading,
      "timeForReadingMinutes": this.pokerroomsIdToBeEdited.timeForReadingMinutes,
      "description": this.pokerroomsIdToBeEdited.description,
      "links": this.pokerroomsIdToBeEdited.links,
      "images": this.pokerroomsIdToBeEdited.images,
      "type": "POKER_ROOM",
    }

    console.log("pokerroomsIdToBeEdited", this.pokerroomsIdToBeEdited)

    this._NewsService.put(this.pokerroomsIdToBeEdited).subscribe((response: any) => {
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
            this.pokerroomsIdToBeEdited.images[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.pokerroomsIdToBeEdited", this.pokerroomsIdToBeEdited)
          } else if (type == "image2") {
            this.pokerroomsIdToBeEdited.images[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.pokerroomsIdToBeEdited", this.pokerroomsIdToBeEdited)
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