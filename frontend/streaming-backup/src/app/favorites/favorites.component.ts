import { VideoRegistrationService } from './../video/video-registration/video-registration.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVideosService } from '../common/services/user-videos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  userId: any;
  favorites: any;
  errorMessage: any;
  filtro: any;
  videoList: any = [{}];

  constructor(
    private router: Router,
    private userVideosService: UserVideosService,
    public videoRegistrationService : VideoRegistrationService
    ) { }

  ngOnInit(): void {
    this.verifyLogin();
    this.getFavorites();
  }

  verifyLogin(): void {
    if(localStorage.getItem('id') === ''){
      this.router.navigate(['/']);
    } else {
      this.userId = localStorage.getItem('id');
    }
  }

  async getFavorites(): Promise<void> {
    this.userVideosService.getByUserId(this.userId).subscribe(
      (res: any) => {
        this.favorites = res;
        console.log(this.favorites);
        this.getFavoritesVideos();
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  getFavoritesVideos(): void {
    for(var i in this.favorites) {
      this.getFavoritesVideosByUser(i, this.favorites[i].idvideo);
    }
    console.log(this.videoList)
  }
  

  getFavoritesVideosByUser(index: any ,id: any): void {
    this.videoRegistrationService.getById(id).subscribe(
      (res: any) => {
        this.videoList[index] = res;
      },
      (err: any) => {
        this.errorMessage = err.error.message;
      }
    );
  }

}
