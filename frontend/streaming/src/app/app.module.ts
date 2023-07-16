import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { VideoRegistrationComponent } from './video/video-registration/video-registration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SafePipe } from './pipes/safe.pipe';
import { LoginComponent } from './Login/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    VideoRegistrationComponent,
    HomePageComponent,
    SafePipe,
    LoginComponent,
    NavbarComponent,
    ArrayFilterPipe,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
