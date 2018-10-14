
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FormBuilder } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  city = '';
  subscription: any;
  forecastData = [];
  weekData = [];
  page: number = 1;

  constructor(private locationService: LocationService,
    private fBuilder: FormBuilder,
    private route: ActivatedRoute,
    private weatherService: WeatherService) { }

  ngOnInit() {

    this.subscription = this.route.paramMap
      .subscribe(params => {
        if (params.get('city') === 'eldoret') {
          this.city = 'Eldoret';
          this.getWeatherForecast(35.27, 0.52);
        } else {
          this.city = params.get('city');
          this.locationService.getCityLocation(this.city).subscribe((data) => {
            var locationsData = JSON.parse(JSON.stringify(data));
            let lat = locationsData.results[0].position[0];
            let long = locationsData.results[0].position[1];
            this.weatherService.getWeatherForecast(long, lat).subscribe((data) => {
              this.forecastData = [];
              var dat = JSON.parse(JSON.stringify(data))
              dat.list.forEach((value) => {
                var weatherObj = {};
                weatherObj['w_date'] = value.dt;
                weatherObj['w_main'] = value.weather[0].main;
                weatherObj['w_desc'] = value.weather[0].description;
                weatherObj['icon'] = `http://openweathermap.org/img/w/${value.weather[0].icon}.png`;
                weatherObj['w_temp'] = value.main.temp.toFixed(2);
                weatherObj['w_mintemp'] = value.main.temp_min.toFixed(2);
                weatherObj['w_maxtemp'] = value.main.temp_max.toFixed(2);
                weatherObj['w_humidity'] = value.main.humidity;
                weatherObj['w_visibility'] = value.visibility;
                weatherObj['w_clouds'] = value.clouds.all;
                this.forecastData.push(weatherObj);
              })

              this.weekData = [];
              this.weekData.push(this.forecastData[3]);
              this.weekData.push(this.forecastData[11]);
              this.weekData.push(this.forecastData[19]);
              this.weekData.push(this.forecastData[27]);
              this.weekData.push(this.forecastData[35]);
              console.log('forecaseddata', this.forecastData);
              console.log('forecased', this.weekData);

              //console.log('awsnap', localForecast.length);
            })
          })
        }
      });

  }

  getWeatherForecast(long: any, lat: any) {
    this.weatherService.getWeatherForecast(long, lat)
      .subscribe((val) => {
        console.log('fe', val)
        var dat = JSON.parse(JSON.stringify(val))
        dat.list.forEach((value) => {
          var weatherObj = {};
          weatherObj['w_date'] = value.dt;
          weatherObj['w_main'] = value.weather[0].main;
          weatherObj['w_desc'] = value.weather[0].description;
          weatherObj['icon'] = `http://openweathermap.org/img/w/${value.weather[0].icon}.png`;
          weatherObj['w_temp'] = value.main.temp.toFixed(2);
          weatherObj['w_mintemp'] = value.main.temp_min.toFixed(2);
          weatherObj['w_maxtemp'] = value.main.temp_max.toFixed(2);
          weatherObj['w_humidity'] = value.main.humidity;
          weatherObj['w_visibility'] = value.visibility;
          weatherObj['w_clouds'] = value.clouds.all;
          this.forecastData.push(weatherObj);
        })
        this.weekData = [];
        this.weekData.push(this.forecastData[3]);
        this.weekData.push(this.forecastData[11]);
        this.weekData.push(this.forecastData[19]);
        this.weekData.push(this.forecastData[27]);
        this.weekData.push(this.forecastData[35]);
        console.log('forecaseddata', this.forecastData);
        console.log('forecased', this.weekData);

      })
  }

}
