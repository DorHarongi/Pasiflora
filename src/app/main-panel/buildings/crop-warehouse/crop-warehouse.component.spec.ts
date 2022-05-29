import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropWarehouseComponent } from './crop-warehouse.component';

describe('CropWarehouseComponent', () => {
  let component: CropWarehouseComponent;
  let fixture: ComponentFixture<CropWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
