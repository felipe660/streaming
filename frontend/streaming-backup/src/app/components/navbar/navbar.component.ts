import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  userId: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.verifyLogin();
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  verifyLogin(): any {
    if(localStorage.getItem('id') === ''){
      return false;
    } else {
      this.userId = localStorage.getItem('id');
      return true;
    }
  }

  logOut(): void {
    localStorage.setItem('id',"");
    window.location.reload();
  }

}
