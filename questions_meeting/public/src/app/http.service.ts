import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getAll(){
    console.log("service.ts / getAll()")
    return this._http.get('/questions');
  }
}
