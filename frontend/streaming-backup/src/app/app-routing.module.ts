import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { VideoRegistrationComponent } from './video/video-registration/video-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { component: UserRegistrationComponent, path: 'user-registration'},
  // { component: VideoRegistrationComponent, path: 'video-registration'},
  // { component: HomePageComponent, path: 'home'},
  { component: LoginComponent, path: 'login'},
  // { component: FavoritesComponent, path: 'favorites'},
  { component: BlogComponent, path: 'blog'},
  { component: BlogComponent, path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
