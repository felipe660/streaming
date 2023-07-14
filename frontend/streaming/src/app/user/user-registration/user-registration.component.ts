import { UserRegistrationService } from './user-registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  form: any = {
    name: null,
    surname: null,
    email: null,
    password: null
  };

  isSuccessful: any;
  isSignUpFailed: boolean = false;
  errorMessage: any;

  constructor(public userRegistrationService: UserRegistrationService) { }

  ngOnInit(): void {
  }

  onSubmitUser(): void {
    console.log(this.form);
    const dto = this.form;
    console.log(dto);
    this.userRegistrationService.saveOrUpdate(dto).subscribe(
      (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err: { error: { message: any; }; }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
