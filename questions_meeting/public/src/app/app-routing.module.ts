import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'browse', component: QuestionsComponent},
  { path: "", pathMatch: "full", redirectTo: "/browse"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
