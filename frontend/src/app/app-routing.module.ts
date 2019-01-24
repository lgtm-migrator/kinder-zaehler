import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {component: HomePageComponent, path: '', pathMatch: 'full', canActivate: [AuthGuard]},
  {component: LoginPageComponent, path: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
