import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackReportComponent } from './attack-report.component';

describe('AttackReportComponent', () => {
  let component: AttackReportComponent;
  let fixture: ComponentFixture<AttackReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
