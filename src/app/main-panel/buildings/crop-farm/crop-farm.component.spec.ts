import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFarmComponent } from './crop-farm.component';

describe('CropFarmComponent', () => {
  let component: CropFarmComponent;
  let fixture: ComponentFixture<CropFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropFarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
