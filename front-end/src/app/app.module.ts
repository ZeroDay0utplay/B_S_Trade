import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { IntroComponent } from './intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { environment } from './env';
import { PredictComponent } from './predict/predict.component';


export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeComponent,
    RegisterComponent,
    IntroComponent,
    LoginComponent,
    ChartComponent,
    ForgetPasswordComponent,
    AlertsComponent,
    ChangePwdComponent,
    PredictComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: BACKEND_URL, useValue: environment.expressUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
