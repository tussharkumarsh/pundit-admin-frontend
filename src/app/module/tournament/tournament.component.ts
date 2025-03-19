import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/service/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.scss']
})
export class TournamentComponent implements OnInit {

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

  tournamentToBeEdited: any = {};

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

  category:any = undefined
  selectedCategory: any = []

  constructor(
    private _NewsService: NewsService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllTournament()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }

  clearFields() {
    this.tournamentToBeEdited.id = ''
    this.tournamentToBeEdited.heading = '',
    this.tournamentToBeEdited.description = '',
    this.tournamentToBeEdited.links = '',
    this.tournamentToBeEdited.images = []
    this.tournamentToBeEdited.type = ''
    this.links = []
    this.tournamentToBeEdited.timeForReadingMinutes = ''
    this.tournamentToBeEdited.category = []
    this.selectedCategory = []
    this.category = undefined
  }

  getAllTournament() {
    this.spinnerService.show();
    this._NewsService.getAllByType('TOURNAMENT').subscribe((response: any) => {
      if (response.success) {
        this.spinnerService.hide();
        this.rows = response.object.content;
        this.total_count = this.rows.length;
      }
    })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true
    this.tournamentToBeEdited = employee;
    this.links = this.tournamentToBeEdited.links
    this.selectedCategory = this.tournamentToBeEdited.category
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

  createTournament() {
    this.spinnerService.show();
    this.tournamentToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.tournamentToBeEdited.links[i] != this.links[i]) {
        this.tournamentToBeEdited.links.push(this.links[i])
      }
    }

    this.tournamentToBeEdited = {
      "heading": this.tournamentToBeEdited.heading,
      "description": this.tournamentToBeEdited.description,
      "links": this.tournamentToBeEdited.links,
      "images": this.tournamentToBeEdited.images,
      "type": "TOURNAMENT",
      "category": this.selectedCategory,
      // "timeForReadingMinutes": this.tournamentToBeEdited.timeForReadingMinutes //this variable used to save details of website
    }

    console.log("tournamentToBeEdited", this.tournamentToBeEdited)

    this._NewsService.post(this.tournamentToBeEdited).subscribe((response: any) => {
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

  updateTournament() {
    this.spinnerService.show();
    this.tournamentToBeEdited.links = []
    for (let i = 0; i < this.links.length; i++) {
      if (this.tournamentToBeEdited.links[i] != this.links[i]) {
        this.tournamentToBeEdited.links.push(this.links[i])
      }
    }

    this.tournamentToBeEdited = {
      "id": this.tournamentToBeEdited.id,
      "heading": this.tournamentToBeEdited.heading,
      "description": this.tournamentToBeEdited.description,
      "links": this.tournamentToBeEdited.links,
      "images": this.tournamentToBeEdited.images,
      "type": "TOURNAMENT",
      "category": this.selectedCategory,
      // "timeForReadingMinutes": this.tournamentToBeEdited.timeForReadingMinutes
    }

    console.log("tournamentToBeEdited", this.tournamentToBeEdited)

    this._NewsService.put(this.tournamentToBeEdited).subscribe((response: any) => {
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
            this.tournamentToBeEdited.images[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.tournamentToBeEdited", this.tournamentToBeEdited)
          } else if (type == "image2") {
            this.tournamentToBeEdited.images[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.tournamentToBeEdited", this.tournamentToBeEdited)
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