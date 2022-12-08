import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CitiesOverviewComponent } from './cities-overview.component';

describe('CitiesOverviewComponent', () => {
  let component: CitiesOverviewComponent;
  let fixture: ComponentFixture<CitiesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit the searchValue event', () => {
    const searchSpy = spyOn(component, 'updateTheSearchValue');
    const inputDebugElem = fixture.debugElement.query(By.css('.search__input'));
    inputDebugElem.triggerEventHandler('keyup', '12345');
    expect(searchSpy).toHaveBeenCalled();
  });
  it('should emit the getTheWeather event', () => {
    const weatherSpy = spyOn(component, 'getTheWeather');
    component.searchValue = '12345';
    const submitDebugElem = fixture.debugElement.query(
      By.css('.search__submit')
    );
    submitDebugElem.triggerEventHandler('click', component.searchValue);
    expect(weatherSpy).toHaveBeenCalled();
  });
  it('should emit the tempScale event', () => {
    const tempScaleSpy = spyOn(component, 'updateTheTempScale');
    const tempDebugElem = fixture.debugElement.query(
      By.css('.actions__temp-toggle')
    );
    tempDebugElem.triggerEventHandler('click');
    expect(tempScaleSpy).toHaveBeenCalled();
  });
});
