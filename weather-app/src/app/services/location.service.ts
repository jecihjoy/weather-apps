import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
 headers: new HttpHeaders({ 'Content_Type' : 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private SEARCHURL = 'https://places.cit.api.here.com/places/v1/autosuggest?at=40.74917,-73.98529&result_types=place&app_id=YWt6GJ7bb5SddD29KP38&app_code=iuvgWgye0R83J44f1ESaXA';
  
  constructor(private httpClient: HttpClient) { }

  getLocations(term: string){
    let url = `${this.SEARCHURL}&q=${term}`;
    console.log('loc url', url);
    return this.httpClient.get(url);
  }

  searchPlaces(term: string){
    if(term.trim()){
    return this.httpClient.get(`${this.SEARCHURL}&q=${term}`).pipe(tap());
    }
  }

  getCityLocation(cityname: string){
    let url = `${this.SEARCHURL}&q=${cityname}`;
    return this.httpClient.get(url);
  }
  
}
