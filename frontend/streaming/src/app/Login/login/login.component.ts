import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/user/user-registration/user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };

  isSuccessful: any;
  isSignUpFailed: boolean = false;
  errorMessage: any;

  constructor (
    public userRegistrationService: UserRegistrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmitLogin(): void {
    const dto = this.form;
    console.log(dto);
    this.userRegistrationService.login(dto).subscribe(
      (res: any) => {
        const id = res[0].id;
        localStorage.setItem('id', id);
        if(res[0].id){
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goNext():void{
    this.router.navigate(['/home']);
  }

}
