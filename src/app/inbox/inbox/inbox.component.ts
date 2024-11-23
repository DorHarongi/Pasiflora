import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { ActiveContent } from '../models/activeContent.enum';
import { AttackReport } from '../models/attackReport';

const WINDOW_SIZE = 6;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private userInformationService: UserInformationService, private http: HttpClient) { 
    this.username = this.userInformationService.userInformation.username;
  }

  //activeContentEnum = ActiveContent;
  //activeContent: ActiveContent = ActiveContent.Reports;
  page: number = 1;
  numberOfPages: number = 1;
  displayedPages: number[] = [];
  username: string;
  attackReportsInPage: Array<AttackReport> = [];
  attackReportPopupOpened: boolean = false;
  clickedAttackReport!: AttackReport;
  subscription1!: Subscription;
  subscription2!: Subscription;

  ngOnDestroy(): void {
    this.subscription1 && this.subscription1.unsubscribe();
    this.subscription2 && this.subscription2.unsubscribe();
  }

  ngOnInit(): void {
    this.getNumberOfAttackReportPages();
    this.getAttackReports();
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

  getNumberOfAttackReportPages(): void
  {
    this.subscription1 = this.http.get<any>(`http://localhost:3000/reports/attackReports/${this.username}`, 
    ).subscribe((numberOfPages)=>{
       this.numberOfPages = numberOfPages;
       this.updateDisplayedPages();
   });
  }

  moveToPage(page: number): void {
    if (page < 1 || page > this.numberOfPages) return; 
    this.page = page;
    this.getAttackReports();
    this.updateDisplayedPages();
  }

  getAttackReports()
  {
    this.subscription2 = this.http.get<any>(`http://localhost:3000/reports/attackReports/${this.username}/${this.page}`, 
     ).subscribe((attackReports)=>{
        this.attackReportsInPage = attackReports;
    });
  }

  openAttackReportPopup(clickedAttackReport: AttackReport)
  {
    this.attackReportPopupOpened = true;
    this.clickedAttackReport = clickedAttackReport;
  }

  makeAttackReportTitle(attackReport: AttackReport): string
  {
    let title = "";

    if(attackReport.attackerName == this.username)
      title += "You";
    else
      title += attackReport.attackerName
    
    title += ` [${attackReport.attackerVillageName}] attacked `

    if(attackReport.defenderName == this.username)
      title += "you";
    else
      title += attackReport.defenderName

    title += ` [${attackReport.defenderVillageName}].`

    return title;
  }

  getAttackResult(attackReport: AttackReport): string
  {
    if(attackReport.attackerName == this.username)
    {
      if(attackReport.attackerWon)
        return "Win";
      return "Defeat";
    }
    if(attackReport.attackerWon)
        return "Defeat";
    return "Win";
  }

  attackReportPopupClosed(){
    this.attackReportPopupOpened = false;
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

}
