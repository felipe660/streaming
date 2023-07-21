import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  filtro: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: string) {
    this.filtro = newItem;
  }
}
