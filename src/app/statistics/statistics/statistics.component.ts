import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  page: number = 0;
  usersInPage: Array<any> = [];

  ngOnInit(): void {
    this.getUserStatistics();
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

  moveToPage(page: number)
  {
    this.page = page;
    this.getUserStatistics();
  }

  getUserStatistics()
  {
    this.http.get<any>(`http://localhost:3000/users/statistics/${this.page}`, 
     ).subscribe((users)=>{
        this.usersInPage = users;
    })
  }

}
