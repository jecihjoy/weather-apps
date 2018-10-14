import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, private locService: LocationService) { }

  private WEATHERURL = 'http://api.openweathermap.org/data/2.5';
  private apiKey = '5e10f5ba642bc4e43318bec00b34c420';
  private ServerUrl = 'http://localhost:3100';

  getHeaders() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return headers;
  }

  getCurrentByCityName(city: string): Observable<any> {
    let city_url = `${this.WEATHERURL}/weather?q=${city}&APPID=${this.apiKey}`;
    return this.http.get<any>(city_url);
  }
  getCurrentByLocation(longitude: any, lat: any): Observable<any> {
    let location_url = `${this.WEATHERURL}/weather?lat=${lat}&lon=${longitude}&APPID=${this.apiKey}`;
    return this.http.get<any>(location_url);
  }

  getWeatherForecast(long: any, lat: any): Observable<any[]> {
    const forecast_url = `${this.WEATHERURL}/forecast?lat=${lat}&lon=${long}&APPID=${this.apiKey}`;
    console.log(forecast_url);
    return this.http.get<any[]>(forecast_url);
  }

  getSavedData(): Observable<any> {
    let url = `${this.ServerUrl}/getData`;
    return this.http.get<any>(url).pipe(tap());
  }

  addData (data: any): Observable<any> {
    console.log('servis', data)
    let url = `${this.ServerUrl}/saveData`
    return this.http.post<any>(url, data, httpOptions).pipe(
      tap((data: any) => console.log(data))
    );
  }
}

