import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'browse', component: QuestionsComponent},
  { path: 'add', component: AddComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: "", pathMatch: "full", redirectTo: "/browse"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
