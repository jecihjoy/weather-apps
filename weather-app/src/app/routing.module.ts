import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MapWeatherComponent } from './map-weather/map-weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';

const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather/edoret', component: CurrentWeatherComponent },
  { path: 'weather/:city', component: CurrentWeatherComponent },
  { path: 'weather-map', component: MapWeatherComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
