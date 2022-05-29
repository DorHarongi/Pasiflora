import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodWarehouseComponent } from './wood-warehouse.component';

describe('WoodWarehouseComponent', () => {
  let component: WoodWarehouseComponent;
  let fixture: ComponentFixture<WoodWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoodWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
