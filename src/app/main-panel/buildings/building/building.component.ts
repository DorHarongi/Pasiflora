import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  building!: Building;

  ngOnInit(): void {
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

}
