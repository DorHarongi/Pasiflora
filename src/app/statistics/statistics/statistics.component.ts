import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  page: number = 0;
  usersInPage: Array<any> = [];
  subscription!: Subscription;

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
    this.subscription = this.http.get<any>(`http://localhost:3000/users/statistics/${this.page}`, 
     ).subscribe((users)=>{
        this.usersInPage = users;
    })
  }

}
