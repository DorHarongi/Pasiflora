import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInformationService } from 'src/app/user-information/user-information.service';

const WINDOW_SIZE = 6;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit, OnDestroy {

  openAttackPopup: boolean = false;
  userToAttack: string = "";

  constructor(private router: Router, private http: HttpClient, private userInformationService: UserInformationService) {
    this.username = userInformationService.userInformation.username;
   }

  ngOnDestroy(): void {
    this.subscription1 && this.subscription1.unsubscribe();
    this.subscription2 && this.subscription2.unsubscribe();
  }

  page: number = 1;
  numberOfPages: number = 1;
  displayedPages: number[] = [];
  usersInPage: Array<any> = [];
  subscription1!: Subscription;
  subscription2!: Subscription;
  username: string;

  ngOnInit(): void {
    this.getNumberOfUserStatisticsPages();
    this.getUserStatistics();
  }

  moveToPage(page: number): void {
    if (page < 1 || page > this.numberOfPages) return; 
    this.page = page;
    this.getUserStatistics();
    this.updateDisplayedPages();
  }

   updateDisplayedPages(): void {
    const halfWindow = Math.floor(WINDOW_SIZE / 2);

    let start = Math.max(this.page - halfWindow, 1);
    let end = start + WINDOW_SIZE - 1;

    if (end > this.numberOfPages) {
      end = this.numberOfPages;
      start = Math.max(end - WINDOW_SIZE + 1, 1);
    }

    this.displayedPages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  getNumberOfUserStatisticsPages()
  {
    this.subscription2 = this.http.get<number>(`http://localhost:3000/users/statistics`, 
    ).subscribe((numberOfPages)=>{
       this.numberOfPages = numberOfPages;
       this.updateDisplayedPages();
   });
  }

  getUserStatistics()
  {
    this.subscription1 = this.http.get<any>(`http://localhost:3000/users/statistics/${this.page}`, 
     ).subscribe((users)=>{
        this.usersInPage = users;
    })
  }

  attackPlayer(playerName: string){
    this.userToAttack = playerName; 
    this.openAttackPopup = true;
  }

  attackPopupClosed(){
    this.openAttackPopup = false;
  }

  getEnergy(): number
  {
    return this.userInformationService.userInformation.energy;
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

}
