import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBuildingComponent } from './center-building.component';

describe('CenterBuildingComponent', () => {
  let component: CenterBuildingComponent;
  let fixture: ComponentFixture<CenterBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterBuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
