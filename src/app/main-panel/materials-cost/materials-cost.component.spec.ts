import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsCostComponent } from './materials-cost.component';

describe('MaterialsCostComponent', () => {
  let component: MaterialsCostComponent;
  let fixture: ComponentFixture<MaterialsCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
