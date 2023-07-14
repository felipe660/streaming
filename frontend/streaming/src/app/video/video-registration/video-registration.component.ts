import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VideoRegistrationService } from './video-registration.service';

@Component({
  selector: 'app-video-registration',
  templateUrl: './video-registration.component.html',
  styleUrls: ['./video-registration.component.scss']
})
export class VideoRegistrationComponent implements OnInit {

  form: any = {
    publisher: "Felipe Milani"
  };

  isSuccessful: any;
  isSignUpFailed: boolean = false;
  errorMessage: any;

  constructor(public videoRegistrationService: VideoRegistrationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(moment());
    this.form.created_at = moment();
    this.form.publish_at = moment();
    const dto = this.form;
    console.log(dto);
    this.videoRegistrationService.saveOrUpdate(dto).subscribe(
      (res: any) => {
        console.log(res);
        console.log("Video inserido com sucesso!");
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}


