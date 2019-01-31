import {NgModule} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {BrowserModule} from '@angular/platform-browser';
import {environment} from "../environments/environment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GoogleSignInButtonComponent} from './components/google-sign-in-button/google-sign-in-button.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GoogleSignInButtonComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
