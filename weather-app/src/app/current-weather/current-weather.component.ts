import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  searchField: FormControl;
  searchForm: FormGroup;
  locations = [];
  weather = {}
  cityName: number;
  subscription: any;
  suggestionDiv: boolean = true;
  reccommendation = '';
  title: string;


  constructor(private locationService: LocationService,
    private fBuilder: FormBuilder,
    private weatherService: WeatherService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchField = new FormControl;
    this.searchForm = this.fBuilder.group({ search: this.searchField });

    this.searchField.valueChanges.pipe(debounceTime(20), distinctUntilChanged(),
      switchMap(term => this.locationService.searchPlaces(term)))
      .subscribe((resultValue) => {
        this.locations = [];
        this.suggestionDiv = true;
        var locationsData = JSON.parse(JSON.stringify(resultValue));
        locationsData.results.forEach(element => {
          var locationObj = {};
          locationObj['latitude'] = element.position[0];
          locationObj['longitude'] = element.position[1];
          locationObj['name'] = element.title;
          if (this.locations.length < 5) {
            this.locations.push(locationObj);
          }
        });
      });

    this.subscription = this.route.paramMap
      .subscribe(params => {
        console.log('city', params.get('city'));
        if (params.get('city') === 'eldoret') {
          this.title = 'Eldoret';
          this.getWeatherByLocation(35.27, 0.52);
        } else {
          this.title = params.get('city');
          this.locationService.getCityLocation(this.title).subscribe((data) => {
            var locationsData = JSON.parse(JSON.stringify(data));
            let lat = locationsData.results[0].position[0];
            let long = locationsData.results[0].position[1];
            this.weatherService.getCurrentByLocation(long, lat).subscribe((data) => {
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
              this.reccommendation = this.returnRecommentation(this.weather);
              console.log('current weather', this.weather);
            })
          })
        }
      });
  }

  getWeatherByLocation(long: any, lat: any) {
    this.weatherService.getCurrentByLocation(long, lat)
      .subscribe((data) => {
        var weatherObj = {};
        weatherObj['w_date'] = data.dt;
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
        this.reccommendation = this.returnRecommentation(this.weather);
      })
  }

  returnRecommentation(weather) {
    var main_weather = weather.w_main;
    switch (main_weather) {
      case 'Rain':
        return 'Too cold and rain out there! Remember umbrella, gumboots, jacket. A cup of coffee too';
      case 'Clouds':
        return 'Too cloudy out there! Carry an umbrella!!';
      case 'Clear':
        return 'Yaay! Sunny day. Day to do some laundry. If going out remember your hat and sunglasses';
      case 'Thunderstorm':
        return 'Lots of winds, Better get a cab';
      case 'Mist':
        return 'Lots of winds, Better get a cab';
    }
  }

  func() {
    this.suggestionDiv = false;
  }
}
