import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneWarehouseComponent } from './stone-warehouse.component';

describe('StoneWarehouseComponent', () => {
  let component: StoneWarehouseComponent;
  let fixture: ComponentFixture<StoneWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoneWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
