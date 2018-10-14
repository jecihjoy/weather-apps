import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodWeatherComponent } from './mood-weather.component';

describe('MoodWeatherComponent', () => {
  let component: MoodWeatherComponent;
  let fixture: ComponentFixture<MoodWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
