import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {
  private city = 'eldoret';
  searchField: FormControl;
  searchForm: FormGroup;
  locations = [];
  weather = {}
  private subscription: any;
  cityName: any;

  constructor(private locationService: LocationService,
    private fBuilder: FormBuilder,
    private weatherService: WeatherService,
    private route: ActivatedRoute){
      this.cityName = this.route.snapshot.paramMap.get('city')
     }

  ngOnInit() {

    this.searchField = new FormControl;
    this.searchForm = this.fBuilder.group({ search: this.searchField });

    this.searchField.valueChanges.pipe(debounceTime(2000), distinctUntilChanged(),
      switchMap(term => this.locationService.searchPlaces(term)))
      .subscribe((resultValue) => {
        var locationsData = JSON.parse(JSON.stringify(resultValue));
        console.log(locationsData);
        locationsData.results.forEach(element => {
          var locationObj = {};
          locationObj['latitude'] = element.position[0];
          locationObj['longitude'] = element.position[1];
          locationObj['name'] = element.title;
          if(this.locations.length < 5){
          this.locations.push(locationObj);
          }
        });
        console.log(this.locations);
      });
    this.getCurrentWeather(this.city);
  }

  getWeatherByLocation(long: any, lat: any){
    this.weatherService.getCurrentByLocation(long, lat)
    .subscribe((data)=> {
      console.log('eldoret', data);
      var weatherObj = {};
      weatherObj['w_main'] = data.weather[0].main;
      weatherObj['w_desc'] = data.weather[0].description;
      weatherObj['icon'] = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherObj['w_temp'] = data.main.temp;
      weatherObj['w_mintemp'] = data.main.temp_min;
      weatherObj['w_maxtemp'] = data.main.temp_max;
      weatherObj['w_humidity'] = data.main.humidity;
      weatherObj['w_visibility'] = data.visibility;
      weatherObj['w_clouds'] = data.clouds.all;
      this.weather = weatherObj;
      console.log(this.weather);
    })
  }
  getCurrentWeather(cityName){
    this.weatherService.getCurrentByCityName(cityName)
    .subscribe((data)=> {
      console.log('eldoret', data);
      var weatherObj = {};
      weatherObj['w_main'] = data.weather[0].main;
      weatherObj['w_desc'] = data.weather[0].description;
      weatherObj['icon'] = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherObj['w_temp'] = data.main.temp;
      weatherObj['w_mintemp'] = data.main.temp_min;
      weatherObj['w_maxtemp'] = data.main.temp_max;
      weatherObj['w_humidity'] = data.main.humidity;
      weatherObj['w_visibility'] = data.visibility;
      weatherObj['w_clouds'] = data.clouds.all;
      this.weather = weatherObj;
      console.log(this.weather);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
