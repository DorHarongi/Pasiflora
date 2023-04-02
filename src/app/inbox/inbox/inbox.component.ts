import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { ActiveContent } from '../models/activeContent.enum';
import { AttackReport } from '../models/attackReport';

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
  username: string;
  attackReportsInPage: Array<AttackReport> = [];
  attackReportPopupOpened: boolean = false;
  clickedAttackReport!: AttackReport;
  subscription!: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAttackReports();
  }

  moveToPage(page: number)
  {
    this.page = page;
    this.getAttackReports();
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

  getAttackReports()
  {
    this.subscription = this.http.get<any>(`http://localhost:3000/reports/attackReports/${this.username}/${this.page}`, 
     ).subscribe((attackReports)=>{
        this.attackReportsInPage = attackReports;
    })
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

}
