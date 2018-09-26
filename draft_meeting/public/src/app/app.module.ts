import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { RecordsComponent } from './records/records.component';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginRegComponent,
    RecordsComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
