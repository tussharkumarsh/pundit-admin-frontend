import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NewsService } from 'src/app/service/news.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.scss']
})
export class NewsComponent implements OnInit {

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

  newsIdToBeEdited: any = {};

  categories: any[] = [];
  errorResponse: any;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  ckeConfig: any
  public editor = ClassicEditor;

  fieldsValidation: boolean = false
  selectedFile: any = null;
  isImage1Uploading: boolean = false
  isImage2Uploading: boolean = false;
  isImageAuthorUploading: boolean = false;
  selectedRole: any[] = [];
  link: any

  @ViewChild("myckeditor") ckeditor: any;

  config = { 
    allowedContent: true
  }

  constructor(
    private _NewsService: NewsService,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllNews()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }

  clearFields(){
    this.newsIdToBeEdited.id = ''
    this.newsIdToBeEdited.heading = '',
    this.newsIdToBeEdited.description = '',
    this.newsIdToBeEdited.links = [],
    this.newsIdToBeEdited.images = []    
    this.newsIdToBeEdited.tags = undefined
    this.newsIdToBeEdited.timeForReadingMinutes = ''
    this.newsIdToBeEdited.category = []
    this.newsIdToBeEdited.authorName = ''
    this.newsIdToBeEdited.authorImage = ''
    this.newsIdToBeEdited.authorDescription = ''
    this.newsIdToBeEdited.authorKeywords = ''
    this.newsIdToBeEdited.type = ''
    this.link = ''
    this.selectedCategory = []
  }


  getAllNews() {
    this.spinnerService.show();
    this._NewsService.getAllByType('NEWS').subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        this.rows = response.object.content;
        this.total_count = this.rows.length;
        console.log("row", this.rows)
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.newsIdToBeEdited = employee;
    this.link = this.newsIdToBeEdited.links[0]
    this.selectedCategory = this.newsIdToBeEdited.category
  }

  category:any = undefined
  selectedCategory: any = []

  addSelectedCategory(){
    this.selectedCategory = [...this.selectedCategory, this.category];
    console.log("this.selectedCategory",this.selectedCategory)
    this.category = undefined
  }

  removeSelectedCategory(item:any){
    this.selectedCategory = this.selectedCategory.filter((itemObj:any) => itemObj !== item);
    console.log("this.selectedCategory",this.selectedCategory)
    this.category = undefined
  }

  createNews() {
    this.spinnerService.show();
    this.newsIdToBeEdited = {
      "heading": this.newsIdToBeEdited.heading,
      "description": this.newsIdToBeEdited.description,
      "links": [this.link],
      "images": this.newsIdToBeEdited.images,
      "tags": this.newsIdToBeEdited.tags,
      "timeForReadingMinutes": this.newsIdToBeEdited.timeForReadingMinutes,
      "category": this.selectedCategory,
      "authorName": this.newsIdToBeEdited.authorName,
      "authorImage": this.newsIdToBeEdited.authorImage,
      "authorDescription": this.newsIdToBeEdited.authorDescription,
      "authorKeywords": this.newsIdToBeEdited.authorKeywords,
      "type": "NEWS"
    }

    // console.log("newsIdToBeEdited", this.newsIdToBeEdited)

    this._NewsService.post(this.newsIdToBeEdited).subscribe((response: any) => {
      this.spinnerService.hide();
      if (response.success) {
        Swal.fire(
          'Success',
          response.message,
          'success'
        )
        this.ngOnInit()
        this.createForm()
      } else {
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

  updateNews() {
    this.spinnerService.show();
    this.newsIdToBeEdited = {
      "id": this.newsIdToBeEdited.id,
      "heading": this.newsIdToBeEdited.heading,
      "description": this.newsIdToBeEdited.description,
      "links": [this.link],
      "images": this.newsIdToBeEdited.images,
      "tags": this.newsIdToBeEdited.tags,
      "timeForReadingMinutes": this.newsIdToBeEdited.timeForReadingMinutes,
      "category": this.selectedCategory,
      "authorName": this.newsIdToBeEdited.authorName,
      "authorImage": this.newsIdToBeEdited.authorImage,
      "authorDescription": this.newsIdToBeEdited.authorDescription,
      "authorKeywords": this.newsIdToBeEdited.authorKeywords,
      "type": "NEWS"
    }

    // console.log("newsIdToBeEdited", this.newsIdToBeEdited)

    this._NewsService.put(this.newsIdToBeEdited).subscribe((response: any) => {
      this.spinnerService.hide();
      if (response.success) {
        Swal.fire(
          'Success',
          response.message,
          'success'
        )
        this.ngOnInit()
        this.createForm()
      } else {
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


  onUpload(type:any) {
    this._NewsService.uploadImage(this.selectedFile).
      subscribe(response => {
        console.log({ response: response });
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "image1") {
            this.newsIdToBeEdited.images[0] = imageResponse.object;
            this.isImage1Uploading = false;
            // console.log("1 this.newsIdToBeEdited",this.newsIdToBeEdited)
          } else if (type == "image2") {
            this.newsIdToBeEdited.images[1] = imageResponse.object;
            this.isImage2Uploading = false;
            // console.log("2 this.newsIdToBeEdited",this.newsIdToBeEdited)
          }
        } else {
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

  onFileChanged(event: any, type:any) {
    let file = event.target.files[0];
    this.selectedFile = file
    if (type == "image1") {
      this.isImage1Uploading = true
    } else if (type == "image2") {
      this.isImage2Uploading = true;
    }
    this.onUpload(type);
  }

  onError(event:any) {
    event.target.src = '../../assets/images/logo.png';
  }


  onUploadAuthorImg(type:any) {
    this._NewsService.uploadImage(this.selectedFile).
      subscribe(response => {
        console.log("111------",{ response: response });
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "imageAuthorImg") {
            this.newsIdToBeEdited.authorImage = imageResponse.object;
            this.isImageAuthorUploading = false;
            console.log("1 this.newsIdToBeEdited",this.newsIdToBeEdited)
          } else if (type == "imageAuthorImg1") {
            this.newsIdToBeEdited.authorImage = imageResponse.object;
            this.isImageAuthorUploading = false;
            console.log("2 this.newsIdToBeEdited",this.newsIdToBeEdited)
          }
        } else {
          this.isImageAuthorUploading = false;
          this.isImageAuthorUploading = false;
          Swal.fire(
            'Error',
            imageResponse.message,
            'error'
          )
        }
      }, error => {
        this.isImageAuthorUploading = false;
        this.isImageAuthorUploading = false;
        Swal.fire(
          'Error!',
          error.error.message,
          'error'
        )
      })
  }

  onFileChangedAuthorImg(event: any, type:any) {
    let file = event.target.files[0];
    this.selectedFile = file
    if (type == "imageAuthorImg") {
      this.isImageAuthorUploading = true
    } else if (type == "image2") {
      this.isImageAuthorUploading = true;
    }
    this.onUploadAuthorImg(type);
  }

  onErrorAuthor(event:any) {
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