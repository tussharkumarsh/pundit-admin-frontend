import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.scss']
})
export class VideosComponent implements OnInit {

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

  videosIdToBeEdited: any = {};

  categories: any[] = [];
  errorResponse: any;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  selectedRole: any[] = [];
  link: any
  fieldsValidation: boolean = false

  selectedFile: any = null;
  isImage1Uploading: boolean = false
  isImage2Uploading: boolean = false;
  isImageAuthorUploading: boolean = false;

  public editor = ClassicEditor;
  config = { }

  category:any = undefined
  selectedCategory: any = []

  constructor(
    public dialog: MatDialog,
    private _NewsService: NewsService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllVideos()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }

  clearFields(){
    this.videosIdToBeEdited.id = ''
    this.videosIdToBeEdited.heading = '',
    this.videosIdToBeEdited.description = '',
    this.videosIdToBeEdited.links = [],
    this.link = ''
    this.videosIdToBeEdited.images = []
    this.videosIdToBeEdited.type = ''
    this.videosIdToBeEdited.authorName = ''
    this.videosIdToBeEdited.authorImage = ''
    this.videosIdToBeEdited.authorDescription = ''
    this.videosIdToBeEdited.authorKeywords = ''
    this.videosIdToBeEdited.category = []
    this.selectedCategory = []
  }

  getAllVideos() {
    this.spinnerService.show();
    this._NewsService.getAllByType('VIDEOS').subscribe((response: any) => {
    this.spinnerService.hide();
      if (response.success) {
        this.rows = response.object.content;
        this.total_count = this.rows.length;
        console.log("row", this.rows)
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.videosIdToBeEdited = employee;
    this.link = this.videosIdToBeEdited.links[0]
    this.selectedCategory = this.videosIdToBeEdited.category
  }

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

  createVideo() {
    this.spinnerService.show();
    this.videosIdToBeEdited = {
      "heading": this.videosIdToBeEdited.heading,
      "description": this.videosIdToBeEdited.description,
      "links": [this.link],
      "images": this.videosIdToBeEdited.images,
      "tags": this.videosIdToBeEdited.tags,
      "timeForReadingMinutes": this.videosIdToBeEdited.timeForReadingMinutes,
      "category": this.selectedCategory,
      "authorName": this.videosIdToBeEdited.authorName,
      "authorImage": this.videosIdToBeEdited.authorImage,
      "authorDescription": this.videosIdToBeEdited.authorDescription,
      "authorKeywords": this.videosIdToBeEdited.authorKeywords,
      "type": "VIDEOS"
    }

    console.log("videosIdToBeEdited", this.videosIdToBeEdited)

    this._NewsService.post(this.videosIdToBeEdited).subscribe((response: any) => {
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

  updateVideo() {
    this.spinnerService.show();
    this.videosIdToBeEdited = {
      "id": this.videosIdToBeEdited.id,
      "heading": this.videosIdToBeEdited.heading,
      "description": this.videosIdToBeEdited.description,
      "links": [this.link],
      "images": this.videosIdToBeEdited.images,
      "tags": this.videosIdToBeEdited.tags,
      "timeForReadingMinutes": this.videosIdToBeEdited.timeForReadingMinutes,
      "category": this.selectedCategory,
      "authorName": this.videosIdToBeEdited.authorName,
      "authorImage": this.videosIdToBeEdited.authorImage,
      "authorDescription": this.videosIdToBeEdited.authorDescription,
      "authorKeywords": this.videosIdToBeEdited.authorKeywords,
      "type": "VIDEOS"
    }

    console.log("videosIdToBeEdited", this.videosIdToBeEdited)

    this._NewsService.put(this.videosIdToBeEdited).subscribe((response: any) => {
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

  onUploadAuthorImg(type:any) {
    this.spinnerService.show();
    this._NewsService.uploadImage(this.selectedFile).subscribe(response => {
      this.spinnerService.hide();
        // console.log("111------",{ response: response });
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "imageAuthorImg") {
            this.videosIdToBeEdited.authorImage = imageResponse.object;
            this.isImageAuthorUploading = false;
            console.log("1 this.videosIdToBeEdited",this.videosIdToBeEdited)
          } else if (type == "imageAuthorImg1") {
            this.videosIdToBeEdited.authorImage = imageResponse.object;
            this.isImageAuthorUploading = false;
            console.log("2 this.videosIdToBeEdited",this.videosIdToBeEdited)
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

  onUpload(type:any) {
    this.spinnerService.show();
    this._NewsService.uploadImage(this.selectedFile).subscribe(response => {
      this.spinnerService.hide();
        console.log({ response: response });
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "image1") {
            this.videosIdToBeEdited.images[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.videosIdToBeEdited",this.videosIdToBeEdited)
          } else if (type == "image2") {
            this.videosIdToBeEdited.images[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.videosIdToBeEdited",this.videosIdToBeEdited)
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


  openDialogWithTemplateRefDescription(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '800px',
      height: '600px'
  });
  }

  onPaste(_event:any) {

  }
  onChange(_event:any) {
    
  }
}