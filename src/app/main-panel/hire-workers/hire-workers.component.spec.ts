import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireWorkersComponent } from './hire-workers.component';

describe('HireWorkersComponent', () => {
  let component: HireWorkersComponent;
  let fixture: ComponentFixture<HireWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
