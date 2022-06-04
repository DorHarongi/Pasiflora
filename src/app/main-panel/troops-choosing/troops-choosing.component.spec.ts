import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopsChoosingComponent } from './troops-choosing.component';

describe('TroopsChoosingComponent', () => {
  let component: TroopsChoosingComponent;
  let fixture: ComponentFixture<TroopsChoosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroopsChoosingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroopsChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
