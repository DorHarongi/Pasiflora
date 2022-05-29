import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodFactoryComponent } from './wood-factory.component';

describe('WoodFactoryComponent', () => {
  let component: WoodFactoryComponent;
  let fixture: ComponentFixture<WoodFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoodFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
