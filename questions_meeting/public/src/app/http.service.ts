import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  getAll(){
    console.log("service.ts / getAll()");
    return this._http.get('/questions');
  }

  getSelected(data){
    console.log("service.ts / getSelected(data), data: ", data);
    // console.log('/questions/'+data.quality+"/"+data.type)
    if(data.quality == ""){
      return this._http.get('/questions');
    }else{
    return this._http.get('/questions/'+data.quality+"/"+data.type)
    }
  }

  add(data){
    console.log("service.ts / add(data), data: ", data);
    return this._http.post('/question', data);
  }

  getOne(id){
    console.log("service.ts / getOne(id), id: ", id);
    return this._http.get('/question/'+id)
  }

  updateThing(data){
    console.log("service.ts / updateThing(upInfo), data: ", data )
    console.log('/questionid/'+ data._id, data);
    
    return this._http.put('/questionid/'+ data._id, data)
  }

  delete(id){
    console.log("service.ts / delete(id), id: ", id )
    return this._http.delete("/question/"+id);
  }

}
