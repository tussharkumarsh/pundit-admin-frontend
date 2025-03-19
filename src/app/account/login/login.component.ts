import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;

  user: any = {}
  loginData: any = {}

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   console.log(this.loginForm.value);
      this.router.navigate(["/layout/news"]); // remove this line when API working
      // return // remove this line when API working
      // this.loginService.post(this.loginForm.value).subscribe(res=>{
      //   console.log(res);
      //   this.router.navigate(["test"]);
      // });
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {
    // this.user.loginType = 'PASSWORD'
    this.loginService.post(this.user).subscribe(response => {
      this.loginData = response
      console.log("login data",this.loginData)
      if (this.loginData.success) {
        // new Promise(resolve => {
          sessionStorage.setItem('cshareUser', JSON.stringify(this.loginData.object));
          // resolve(0);
        // }).then(() => {
          // this.navigateAfterLogin();
          this.router.navigate(['/layout/news']);
        // })
      } else {
        Swal.fire(
          'Error!',
          'Check Your credentials',
          'error'
        )
      }
    }, error => {
      this.loginData.error
      Swal.fire(
        'Error!',
        this.loginData.error.message,
        'error'
      )
    })
  }

  navigateAfterLogin() {
    console.log("this.loginData",this.loginData.object.employee.role)
    if(this.loginData.object.employee.role == 'CALL_CENTRE_EMPLOYEE'){
      console.log("role", this.loginData.object.employee.role)
      this.router.navigate(['/layout/complaints']);
    } else if(this.loginData.object.employee.role == 'SERVICE_CENTRE_STORE_MANAGER') {
      this.router.navigate(['/layout/dashboard']);
    }else if(this.loginData.object.employee.role == 'SERVICE_ADMIN') {
      this.router.navigate(['/layout/createServiceCentreWithFDE']);
    }else if(this.loginData.object.employee.role == 'SALES_FRONT_DESK_EXECUTIVE' || this.loginData.object.employee.role == 'REGIONAL_CUSTOMER_SUPPORT_MANAGER') {
      this.router.navigate(['/layout/reports']);
    }else{
      sessionStorage.clear();
      Swal.fire(
        'Error!',
        'Check Your credentials',
        'error'
      )
    }
  }



  loginUser(){

    this.loginService.post(this.user).subscribe(response => {
      this.loginData = response
      console.log("this.loginData",this.loginData)
      if (this.loginData.success) {
        sessionStorage.setItem('cshareUser', JSON.stringify(this.loginData.object));
        this.router.navigate(['/layout/news']);
      } else {
        Swal.fire(
          'Error!',
          'Check Your credentials',
          'error'
        )
      }
    }, error => {
      this.loginData = error
      Swal.fire(
        'Error!',
         error,
        'error'
      )
    })


  }
}
