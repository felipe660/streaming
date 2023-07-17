import { UserVideosService } from './../common/services/user-videos.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VideoRegistrationService } from '../video/video-registration/video-registration.service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  errorMessage: any;
  videoList: any;
  filtro: any;
  faHeart = faHeart;
  faHeartSolid = faHeartSolid;
  userId: any ;
  favorites: any;

  constructor(
    public videoRegistrationService : VideoRegistrationService,
    private router: Router,
    private userVideosService: UserVideosService
    ) { }

  ngOnInit(): void {
    this.verifyLogin();
    this.getFavorites();
    this.getAllVideos();
  }

  verifyLogin(): void {
    if(localStorage.getItem('id') === ''){
      this.router.navigate(['/']);
    } else {
      this.userId = localStorage.getItem('id');
    }
  }

  getFavorites(): void {
    this.userVideosService.get().subscribe(
      (res: any) => {
        this.favorites = res;
        console.log(this.favorites);
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  isFavorite(id: any): any {
    for(var i in this.favorites){
      if(this.favorites[i].idvideo === id){
        return true;
      } 
    }
  }

  getAllVideos(): void{
    this.videoRegistrationService.get().subscribe(
      (res: any) => {
        this.videoList = res;
        console.log(this.videoList);
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  removeVideo(userId: any, videoId: any): void {
    const dto = {
      iduser: userId,
      idvideo: videoId
    }
    this.userVideosService.remove(dto).subscribe(
      (res: any) => {
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
    this.getFavorites();
    this.getAllVideos();
  }

  saveVideo(userId: any, videoId: any): void {
    const dto = {
      iduser: userId,
      idvideo: videoId
    }
    this.userVideosService.saveOrUpdate(dto).subscribe(
      (res: any) => {
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
    this.getFavorites();
    this.getAllVideos();
  }

  addItem(newItem: string) {
    this.filtro = newItem;
  }
}
