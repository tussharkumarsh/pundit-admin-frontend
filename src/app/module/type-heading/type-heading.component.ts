import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-type-heading',
  templateUrl: './type-heading.component.html',
  styleUrls: ['./type-heading.scss']
})
export class TypeHeadingComponent implements OnInit {

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

  promotionIdToBeEdited: any = {};

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
    private _CategoryService: CategoryService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllCategory()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }

  clearFields() {
    this.promotionIdToBeEdited.id = ''
    this.promotionIdToBeEdited.name = ''
  }

  getAllCategory() {
    // this.spinnerService.show();
    this._CategoryService.getAll().subscribe((response: any) => {
      console.log("response--------",response)
      if (response) {
        this.spinnerService.hide();
        this.rows = response;
        this.total_count = this.rows.length;
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.promotionIdToBeEdited = employee;
  }

  createCategory() {
    this.spinnerService.show();

    this.promotionIdToBeEdited = {
      "name": this.promotionIdToBeEdited.name,
    }

    console.log("promotionIdToBeEdited", this.promotionIdToBeEdited)

    this._CategoryService.post(this.promotionIdToBeEdited).subscribe((response: any) => {
      if (response) {
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

  updateCategory() {
    this.spinnerService.show();

    this.promotionIdToBeEdited = {
      "id": this.promotionIdToBeEdited.id,
      "name": this.promotionIdToBeEdited.name,
    }

    console.log("promotionIdToBeEdited", this.promotionIdToBeEdited)

    this._CategoryService.post(this.promotionIdToBeEdited).subscribe((response: any) => {
      if (response) {
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
            this.promotionIdToBeEdited.bannerImages[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.promotionIdToBeEdited", this.promotionIdToBeEdited)
          } else if (type == "image2") {
            this.promotionIdToBeEdited.bannerImages[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.promotionIdToBeEdited", this.promotionIdToBeEdited)
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