import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }
  editInfo: any;
  error: any;
  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.getById(params['id'])
    })
    this.editInfo={
      quality: "",
      type: "",
      question: "",
    }
  }

  getById(id){
    console.log("Edit.comp.ts // getById(id), id: ", id)
    this.error = "";
    let obs = this._http.getOne(id);
    obs.subscribe(data =>{
      console.log("subscribed this is data: ", data)
      if(data['message'] == true){
        this.editInfo = data['question']
        console.log('this.editInfo: ', this.editInfo)
        // this.ngOnInit();
      }else{
        console.log("Got a problem, data['err']: ", data['err'])
        this.error = "unable to load"
      }
    })
  }


  OnEdit(){
    console.log("This is the data we are going to add ", this.editInfo)
    this.error="";
    let obs = this._http.updateThing(this.editInfo);
    obs.subscribe(data =>{
      console.log("subscribed this is the data: ", data)
      if(data['message'] == true) {
        console.log("Correctly edited")
        this._router.navigate(['/browse']);
      }
      else {
        console.log("Got a problem, data['err']: ", data['err'])
        this.error = "unable to edit"
      }
    }
  )
  }
}
