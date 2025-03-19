import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NewsService } from 'src/app/service/news.service';
import { ProductService } from 'src/app/service/product.service';

import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.scss']
})
export class ProductComponent implements OnInit {

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

  productsIdToBeEdited: any = {};

  categories: any[] = [];
  errorResponse: any;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  colorAndPrice: any = {}
  selectedColor:any = undefined
  selectedColorPrice:any = ''
  subCategory:any = []
  

  Object = Object;

  isProductImageUploading: boolean = false
  isImage1Uploading: boolean = false;
  isImage2Uploading: boolean = false;
  selectedFile: any = null;

  public editor = ClassicEditor;
  config = { }
  categoriesList:any = []

  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _NewsService: NewsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllNews()
    this.getAllCategory()
  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom
    this.ngOnInit()
  }
  
  clearFields(){
    this.productsIdToBeEdited.id = ''
    this.productsIdToBeEdited.productName = '',
    this.productsIdToBeEdited.category = undefined,
    this.productsIdToBeEdited.description = '',
    this.productsIdToBeEdited.detail = '',
    this.productsIdToBeEdited.pricing = '',
    this.productsIdToBeEdited.ratings = '',
    this.productsIdToBeEdited.colours = '',
    this.productsIdToBeEdited.colourPricing = '',
    this.productsIdToBeEdited.status = undefined
    this.productsIdToBeEdited.previewImages = []
    this.productsIdToBeEdited.images = '',
    this.productsIdToBeEdited.subCategory = null,
    this.productsIdToBeEdited.discountPercentage = '',
    this.productsIdToBeEdited.discountCode = '',
    this.productsIdToBeEdited.discountAmount = '',
    this.colorAndPrice = {}
  }

  getAllNews() {
    this._ProductService.getBystatus().subscribe((response: any) => {
      if (response.success) {
        this.rows = response.object.content;
        this.total_count = this.rows.length;
        console.log("row", this.rows)
      }
    })
  }
  
  getAllCategory() {
    this._CategoryService.getAll().subscribe((response: any) => {
      if (response) {
        this.categoriesList = response;
        this.categoriesList = this.categoriesList.filter((item:any) => item.name.startsWith('Product'));
        console.log("categoriesList--------",this.categoriesList)
      }
    })
  }


  onEdit(employee: any) {
    this.showCreateFrom = true
    this.productsIdToBeEdited = employee;
    this.colorAndPrice = this.productsIdToBeEdited.coloursAndPrices
    this.subCategory = this.productsIdToBeEdited.subCategory[0]
  }

  createProduct() {

    // let subCategory = [this.productsIdToBeEdited.subCategory]

    this.productsIdToBeEdited = {
      "productName": this.productsIdToBeEdited.productName,
      "category": this.productsIdToBeEdited.category,
      "description": this.productsIdToBeEdited.description,
      "detail": this.productsIdToBeEdited.detail,
      "pricing": this.productsIdToBeEdited.pricing,
      "ratings": this.productsIdToBeEdited.ratings,
      "colours": this.productsIdToBeEdited.colours,
      "colourPricing": this.productsIdToBeEdited.colourPricing,
      "coloursAndPrices": this.colorAndPrice,
      "status": this.productsIdToBeEdited.status,
      "images": this.productsIdToBeEdited.images,
      "previewImages": this.productsIdToBeEdited.previewImages,
      "subCategory": [this.subCategory],      
      "discountPercentage": this.productsIdToBeEdited.discountPercentage,      
      "discountCode": this.productsIdToBeEdited.discountCode, 
      "discountAmount": this.productsIdToBeEdited.discountAmount,  

    }

    console.log("productsIdToBeEdited", this.productsIdToBeEdited)

    this._ProductService.post(this.productsIdToBeEdited).subscribe((response: any) => {
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
        'Already Exist',
        'error'
      )
    })
  }



  updateProduct() {

    // let subCategoryObj = this.subCategory

    this.productsIdToBeEdited = {
      "id": this.productsIdToBeEdited.id,
      "productName": this.productsIdToBeEdited.productName,
      "category": this.productsIdToBeEdited.category,
      "description": this.productsIdToBeEdited.description,
      "detail": this.productsIdToBeEdited.detail,
      "pricing": this.productsIdToBeEdited.pricing,
      "ratings": this.productsIdToBeEdited.ratings,
      "colours": this.productsIdToBeEdited.colours,
      "colourPricing": this.productsIdToBeEdited.colourPricing,
      "coloursAndPrices": this.colorAndPrice,
      "status": this.productsIdToBeEdited.status,
      "images": this.productsIdToBeEdited.images,
      "previewImages": this.productsIdToBeEdited.previewImages,
      "subCategory": [this.subCategory],  
      "discountPercentage": this.productsIdToBeEdited.discountPercentage,      
      "discountCode": this.productsIdToBeEdited.discountCode,  
      "discountAmount": this.productsIdToBeEdited.discountAmount,  
        

    }

    console.log("productsIdToBeEdited", this.productsIdToBeEdited)

    this._ProductService.put(this.productsIdToBeEdited).subscribe((response: any) => {
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


  changeStatus(event:any, row:any){
    console.log("event.target.value",event.target.checked)
    console.log("row",row)


    if(event.target.checked){
      row.status = 'ACTIVE'
    }else{
      row.status = 'IN_ACTIVE'
    }

    this._ProductService.put(row).subscribe((response: any) => {
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
  
  

  addColorAndPrice(){
    this.colorAndPrice[this.selectedColor] = this.selectedColorPrice;
    console.log("this.colorAndPrice",this.colorAndPrice)
    this.selectedColor = undefined
    this.selectedColorPrice = ''
  }

  removeSelectedColor(selectedColor:any){
    delete this.colorAndPrice[selectedColor]
  }


  onUpload(type: any) {
    // this.spinnerService.show();
    this._NewsService.uploadImage(this.selectedFile).subscribe(response => {
      console.log({ response: response });
      // this.spinnerService.hide();
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "image1") {
            this.productsIdToBeEdited.images = imageResponse.object;
            this.isProductImageUploading = false;
            console.log("1 this.productsIdToBeEdited", this.productsIdToBeEdited)
          } else if (type == "image2") {
            this.productsIdToBeEdited.images = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.productsIdToBeEdited", this.productsIdToBeEdited)
          }
        } else {
          // this.spinnerService.hide();
          this.isProductImageUploading = false;
          this.isImage2Uploading = false;
          Swal.fire(
            'Error',
            imageResponse.message,
            'error'
          )
        }
      }, error => {
        this.isProductImageUploading = false;
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
      this.isProductImageUploading = true
    } else if (type == "image2") {
      this.isImage2Uploading = true;
    }
    this.onUpload(type);
  }

  onError(event: any) {
    event.target.src = '../../assets/images/logo.png';
  }







  onUploadPreviewImages(type: any) {
    // this.spinnerService.show();
    this._NewsService.uploadImage(this.selectedFile).subscribe(response => {
      console.log({ response: response });
      // this.spinnerService.hide();
        let imageResponse: any = response
        if (imageResponse.success) {
          if (type == "imageLeft") {
            this.productsIdToBeEdited.previewImages[0] = imageResponse.object;
            this.isImage1Uploading = false;
            console.log("1 this.productsIdToBeEdited", this.productsIdToBeEdited)
          } else if (type == "imageRight") {
            this.productsIdToBeEdited.previewImages[1] = imageResponse.object;
            this.isImage2Uploading = false;
            console.log("2 this.productsIdToBeEdited", this.productsIdToBeEdited)
          }
        } else {
          // this.spinnerService.hide();
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

  onPreviewFileChanged(event: any, type: any) {
    let file = event.target.files[0];
    this.selectedFile = file
    if (type == "imageLeft") {
      this.isImage1Uploading = true
    } else if (type == "imageRight") {
      this.isImage2Uploading = true;
    }
    this.onUploadPreviewImages(type);
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

  openDialogWithTemplateRefDetails(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '800px',
      height: '600px'
  });
  }
  
}