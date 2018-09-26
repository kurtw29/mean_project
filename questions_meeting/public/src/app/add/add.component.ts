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


  //this is THE FOR-LOOP TOQUESTIONS (need to unlock HTML "generate button")
  // OnAddLoop(dataLoop) {
  //   console.log("This is the data we are adding, ", dataLoop)
  //   let obs = this._http.add(dataLoop)
  //   obs.subscribe(data => {console.log("This is the data we got back from service", data)
  //   if(data['message'] == true){
  //     console.log("We successfully added the new question");
  //     this._router.navigate(['/browse']);
  //   }
  //   else {
  //     console.log("We had some errors adding a question ", data['err'])
  //   }
  //   })
  // }
  // generate(){
  //   for(let q of ["Framing", "Alternative", "Information", "Integration", "Values", "Commitment"]){
  //     for(let t of ["Head", "Heart"]){
  //       for(let i=0; i < 10; i++){
  //         this.OnAddLoop({question: `For-Looped Question: ${i}`, quality:`${q}`, type:`${t}`})
  //       }
  //     }
  //   }
  //   return (console.log("Complete for-looped question genereateQ()"))
  // }
}
