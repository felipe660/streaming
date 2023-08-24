import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

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
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.setItem('id', '');
  }

  onSubmitLogin(): void {
    const dto = this.form;
    console.log(dto)
    this.userService.login(this.form).subscribe(
      (res: any) => {
        console.log(res)
        const id = res[0]?.id;
        localStorage.setItem('id', id);
        if(res[0].id){
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.isSignUpFailed = true;
      }
    );
  }

  goNext():void{
    this.router.navigate(['/match']);
  }

}
