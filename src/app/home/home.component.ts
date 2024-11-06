import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  showLoadButton = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchByKeyword(searchKeyword: string) {
    console.log(searchKeyword);
    this.pageNumber = 0;
  }
}
