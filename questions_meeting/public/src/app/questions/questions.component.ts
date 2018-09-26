import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  filter: any;

  constructor(private _http:HttpService, private _route:ActivatedRoute, private _router:Router) { }
  error: any;
  questions: any;
  selected = {
    'quality':'',
    'type':""
  }

  ngOnInit() {
    this.getQuestions();
    // this.filter = {quality: { $or: [ 'framing', 'alternative', 'values', 'information', 'integration', 'commitment to action' ]}, type:{$or: ['head', 'heart']}}

  }

  getQuestions(){
    // this.selected['type'] = "";
    // this.selected['quality'] = "";
    this.error = "";
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


  // User selected criteria for query list of questions
  onSelected(){
    console.log("questions.compt.ts / onSubmit(), this.selected: ", this.selected)
    this.error = "";
    let obs = this._http.getSelected(this.selected);
    obs.subscribe(data =>{
      console.log("obs.susbscribe data: ", data);
      if(data['message'] == true){
        console.log("Subscribe - True, data: ", data)
        this.questions = data['questions']
      }else{
        console.log("There's an error, data: ", data)
        this.error = "Unable to load page"
      }
    })
  };
  
  OnDelete(id){
    this.error = "";
    console.log("questions.compt.ts / this.OnDelete(id), id: ", id);
    let obs = this._http.delete(id);
    obs.subscribe(data => {
      console.log("obs.subscribe data: ", data);
      if(data['message'] == true){
        this.onSelected();
      }
      else{
        console.log("Unable to delete, data['err']: ", data['err'])
        this.error = "Unable to delete"
      }
    })
  }
}
  //**** setting the variables/keys */
  // selected = {
  //   'framing':false,
  //   'alternative': false,
  //   'values':false,
  //   'information':false,
  //   'integration': false,
  //   'commitment':false
  // }
  // quality_keys = [ 'framing', 'alternative', 'values', 'information', 'integration', 'commitment to action' ];
  //  select_list = []


  //*** setting the methods for filter */
  //filter for display:
  // onNewTouchy(){
  //   console.log("this is the selected stuff", this.selected)
  // }

  // onSelected(){
  //   this.quality_keys = [];
  //   console.log("this.selected: ", this.selected)
  //   for(let f of [ 'framing', 'alternative', 'values', 'information', 'integration', 'commitment' ]){
  //     console.log("this.selecteed[f]: ", this.selected[f])
  //     if(this.selected[f] == true){
  //       this.quality_keys.push(f);
  //       console.log("in for-loops - this.quality_keys: ", this.quality_keys)
  //     }
  //   }
  //   console.log("this.quality_keys: ", this.quality_keys)
  //   this.filter = {quality: { $or: this.quality_keys}, type:{$or: ['head', 'heart']}}
  //   this.getQuestions();
  // }