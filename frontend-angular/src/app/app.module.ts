import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './components/login/login.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RegisterModule } from './components/register/register.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    RegisterModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
