import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FilterPipeModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
