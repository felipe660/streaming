import { SelectTeamComponent } from './select-team/select-team.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { component: HomeComponent, path: ''},
  { component: LoginComponent, path: 'login'},
  { component: HomeComponent, path: 'match'},
  { component: SelectTeamComponent, path: 'select-team'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
