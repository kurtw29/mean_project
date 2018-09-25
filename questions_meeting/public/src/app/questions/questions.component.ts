import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }
  error: any;
  questions: any;
  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(){
    let obs = this._http.getAll();
      obs.subscribe(data =>{
        console.log("questions.comp.ts ngOnInit obs => data:", data)
        if(data['message'] == true){
          console.log("Getting all questions, data['decisions']: ", data['decisions']);
          this.questions = data['decisions'];
        }else{
          console.log("There's an error")
          this.error = "Unable to load page";
        }
      });
  };
}
