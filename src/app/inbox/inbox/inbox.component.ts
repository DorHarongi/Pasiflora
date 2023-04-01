import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveContent } from '../models/activeContent.enum';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  constructor(private router: Router) { }

  activeContentEnum = ActiveContent;
  activeContent: ActiveContent = ActiveContent.Reports;
  page: number = 1;

  ngOnInit(): void {
  }

  moveToPage(page: number)
  {

  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }
  

}
