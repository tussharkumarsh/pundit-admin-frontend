import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { MatOptionSelectionChange, ThemePalette } from '@angular/material/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-login-user-profile',
  templateUrl: './login-user-profile.component.html',
  styleUrls: ['./login-user-profile.scss']
})
export class LoginUserProfileComponent implements OnInit {

  total_count: number = 0;
  rows: any = [];
  rows1: any = [];
  expanded: any = {};
  timeout: any;
  ColumnMode = ColumnMode;
  typeSelected = 'ball-fussion';
  @ViewChild('myTable') table: any;


  showCreateFrom: boolean = true;
  firstCollapse: boolean = true;

  employeeIdToBeEdited: any = {};


  categories: any[] = [];
  errorResponse: any;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;


  constructor(
    // private _SignupService: SignupService,
    // private _CustomerService: CustomerService,
    // private _CategoryService: CategoryService,

  ) { }

  ngOnInit() {

  }

  createForm() {
    this.showCreateFrom = !this.showCreateFrom;
  }

  getAllCustomers() {
    // this._CustomerService.getAllCustomers(2000, 0).subscribe((response: any) => {
    //   if (response.success) {
    //     this.rows = response.object.content;
    //     this.total_count = this.rows.length;
    //     console.log("row", this.rows)
    //   }
    // })
  }

  onEdit(employee: any) {
    this.showCreateFrom = true;
    this.employeeIdToBeEdited = employee;
  }

  submitUser() {
    this.employeeIdToBeEdited = {
      "username": this.employeeIdToBeEdited.username,
      "role": [this.employeeIdToBeEdited.role],
      "password": this.employeeIdToBeEdited.password,
      "firstName": this.employeeIdToBeEdited.firstName,
      "lastName": this.employeeIdToBeEdited.lastName,
      "contact": this.employeeIdToBeEdited.contact,
      "middleName": this.employeeIdToBeEdited.middleName,
      "fullName": this.employeeIdToBeEdited.fullName,
      "fatherName": this.employeeIdToBeEdited.fatherName,
      "secondaryContact": this.employeeIdToBeEdited.secondaryContact,
      "email": this.employeeIdToBeEdited.email,
      "gender": this.employeeIdToBeEdited.gender,
      "imageId": null,
      "imageUrl": null,
      "address": this.employeeIdToBeEdited.address,
      "flatNo": this.employeeIdToBeEdited.flatNo,
      "landmark": this.employeeIdToBeEdited.landmark,
      "city": this.employeeIdToBeEdited.city,
      "district": this.employeeIdToBeEdited.district,
      "state": this.employeeIdToBeEdited.state,
      "country": this.employeeIdToBeEdited.country,
      "pincode": this.employeeIdToBeEdited.pincode,
      "dob": null,
      "location": null,
      "status": this.employeeIdToBeEdited.status
    };

    console.log("employeeIdToBeEdited", this.employeeIdToBeEdited);

    // this._SignupService.createUser(this.employeeIdToBeEdited).subscribe((response: any) => {
    //   if (response.success) {
    //     Swal.fire(
    //       'Success',
    //       response.message,
    //       'success'
    //     )
    //     this.ngOnInit()
    //     this.createForm()
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       response.message,
    //       'error'
    //     )
    //   }
    // }, error => {
    //   this.errorResponse = error
    //   Swal.fire(
    //     'Error',
    //     'Already Exist',
    //     'error'
    //   )
    // })
  }

  selectedRole: any[] = [];

  onSelectRole(event: any) {
    console.log("event", event.target.value);
    var onSelectedRole = event.target.value;
    // console.log("value",value)
    this.selectedRole.push(onSelectedRole);
    console.log("this.selectedRole", this.selectedRole);
  }


  updateUser() {
    // this.employeeIdToBeEdited.role = []
    for (let i = 0; i < this.selectedRole.length; i++) {
      if (this.employeeIdToBeEdited.role[i] != this.selectedRole[i]) {
        this.employeeIdToBeEdited.role.push(this.selectedRole[i]);
      }
    }

    this.employeeIdToBeEdited = {
      "id": this.employeeIdToBeEdited.id,
      "username": this.employeeIdToBeEdited.username,
      "role": this.employeeIdToBeEdited.role,
      "firstName": this.employeeIdToBeEdited.firstName,
      "lastName": this.employeeIdToBeEdited.lastName,
      "contact": this.employeeIdToBeEdited.contact,
      "middleName": this.employeeIdToBeEdited.middleName,
      "fullName": this.employeeIdToBeEdited.fullName,
      "fatherName": this.employeeIdToBeEdited.fatherName,
      "secondaryContact": this.employeeIdToBeEdited.secondaryContact,
      "email": this.employeeIdToBeEdited.email,
      "gender": this.employeeIdToBeEdited.gender,
      "imageId": null,
      "imageUrl": null,
      "address": this.employeeIdToBeEdited.address,
      "flatNo": this.employeeIdToBeEdited.flatNo,
      "landmark": this.employeeIdToBeEdited.landmark,
      "city": this.employeeIdToBeEdited.city,
      "district": this.employeeIdToBeEdited.district,
      "state": this.employeeIdToBeEdited.state,
      "country": this.employeeIdToBeEdited.country,
      "pincode": this.employeeIdToBeEdited.pincode,
      "dob": null,
      "location": null,
      "status": this.employeeIdToBeEdited.status
    };

    console.log("employeeIdToBeEdited", this.employeeIdToBeEdited);

    // this._CustomerService.updateUser(this.employeeIdToBeEdited).subscribe((response: any) => {
    //   if (response.success) {
    //     Swal.fire(
    //       'Success',
    //       response.message,
    //       'success'
    //     )
    //     this.ngOnInit()
    //     this.createForm()
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       response.message,
    //       'error'
    //     )
    //   }
    // }, error => {
    //   this.errorResponse = error
    //   Swal.fire(
    //     'Error',
    //     this.errorResponse,
    //     'error'
    //   )
    // })


  }

  changed(value: any) {
    console.log(value);

    var status = true;
    if (value.status == 'ACTIVE') {
      status = false;
    }

    // this._CategoryService.updateStatus(value.id, status).subscribe((response: any) => {
    //   if (response.success) {
    //     Swal.fire(
    //       'Success',
    //       response.message,
    //       'success'
    //     )
    //     this.ngOnInit()
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       response.message,
    //       'error'
    //     )
    //   }
    // }, error => {
    //   this.errorResponse = error
    //   Swal.fire(
    //     'Error',
    //     this.errorResponse,
    //     'error'
    //   )
    // })
  }



  fieldsValidation: boolean = false;
  checkUserName() {
    // this._SignupService.checkUsernameAvailable(this.employeeIdToBeEdited.username).subscribe((response: any) => {
    //   if (response.success) {
    //     // Swal.fire(
    //     //   'Success',
    //     //   response.message,
    //     //   'success'
    //     // )
    //     // this.ngOnInit()
    //     this.fieldsValidation = response.object
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       response.message,
    //       'error'
    //     )
    //   }
    // }, error => {
    //   this.errorResponse = error
    //   Swal.fire(
    //     'Error',
    //     this.errorResponse,
    //     'error'
    //   )
    // })

  }
}