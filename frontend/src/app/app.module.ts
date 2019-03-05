import {NgModule} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireFunctionsModule} from "@angular/fire/functions";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {environment} from "../environments/environment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GoogleSignInButtonComponent} from './components/google-sign-in-button/google-sign-in-button.component';
import {JoinScoutFormComponent} from './components/join-scout-form/join-scout-form.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { CreateScoutFormComponent } from './components/create-scout-form/create-scout-form.component';
import { ScoutListComponent } from './components/scout-list/scout-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInButtonComponent,
    HomePageComponent,
    AuthPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    JoinScoutFormComponent,
    CreateScoutFormComponent,
    ScoutListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
