import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCityDetailComponent } from './active-city-detail.component';

describe('ActiveCityDetailComponent', () => {
  let component: ActiveCityDetailComponent;
  let fixture: ComponentFixture<ActiveCityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
