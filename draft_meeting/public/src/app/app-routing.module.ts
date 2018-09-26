import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { StartComponent } from './start/start.component';
import { RecordsComponent } from './records/records.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  // { path: "", component: AppComponent },
  { path: "loginReg", component: LoginRegComponent },
  { path: "start", component: StartComponent },
  { path: "records", component: RecordsComponent },
  { path: "meeting", component: MeetingComponent },
  { path: "", pathMatch: "full", redirectTo: "/loginReg"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
