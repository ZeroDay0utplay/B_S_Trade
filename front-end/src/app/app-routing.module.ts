import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: 'stocks/:id',
  //   component: StockComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'forget_pwd',
    component: ForgetPasswordComponent
  },
  {
    path: 'change_pwd',
    component: ChangePwdComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
