import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TroopsAmounts } from 'src/app/main-panel/models/troopsAmounts';
import { AttackReport } from '../models/attackReport';

@Component({
  selector: 'app-attack-report',
  templateUrl: './attack-report.component.html',
  styleUrls: ['./attack-report.component.scss']
})
export class AttackReportComponent implements OnInit {

  @Input() attackReport!: AttackReport;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();
  troopDictionariesByType: {[troopsType: string]: TroopsAmounts[]} = {};



  constructor() { }

  ngOnInit(): void {
    this.troopDictionariesByType["attacker"] = [];
    this.troopDictionariesByType["defender"] = [];
    this.troopDictionariesByType["support"] = [];

    this.troopDictionariesByType["attacker"][0] = this.attackReport.attackerTroops;
    this.troopDictionariesByType["attacker"][1] = this.attackReport.attackerLostTroops;
    this.troopDictionariesByType["defender"][0] = this.attackReport.defenderTotalTroops;
    this.troopDictionariesByType["defender"][1] = this.attackReport.defenderTotalLostTroops;
    this.troopDictionariesByType["support"][0] = this.attackReport.supportTotalTroops;
    this.troopDictionariesByType["support"][1] = this.attackReport.supportTotalLostTroops;
  }

  goBack(){
    this.closed.emit();
  }

}
