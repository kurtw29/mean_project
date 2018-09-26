import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }
  addInfo: any
  ngOnInit() {
    this.addInfo = {
      quality: "",
      type: "",
      question: ""
    }
  }

  OnAdd() {
    console.log("This is the data we are adding, ", this.addInfo)
    let obs = this._http.add(this.addInfo)
    obs.subscribe(data => {console.log("This is the data we got back from service", data)
    if(data['message'] == true){
      console.log("We successfully added the new question");
      this._router.navigate(['/browse']);
    }
    else {
      console.log("We had some errors adding a question ", data['err'])
    }
    })
  }

}
