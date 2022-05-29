import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneMineComponent } from './stone-mine.component';

describe('StoneMineComponent', () => {
  let component: StoneMineComponent;
  let fixture: ComponentFixture<StoneMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneMineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoneMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
