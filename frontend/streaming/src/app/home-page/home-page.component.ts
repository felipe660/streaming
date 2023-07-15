import { Component, Input, OnInit, Output } from '@angular/core';
import { VideoRegistrationService } from '../video/video-registration/video-registration.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  errorMessage: any;
  videoList: any;
  filtro: any;

  constructor(public videoRegistrationService : VideoRegistrationService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos(): void{
    this.videoRegistrationService.get().subscribe(
      (res: any) => {
        console.log(res);
        this.videoList = res;
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  addItem(newItem: string) {
    this.filtro = newItem;
  }
}
