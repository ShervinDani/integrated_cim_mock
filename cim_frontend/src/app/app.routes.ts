import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RechargeComponent } from './recharge/recharge.component';
import { CustomerregisterComponent } from './customerregister/customerregister.component';
import { StatustrackingComponent } from './statustracking/statustracking.component';
import { PaymentComponent } from './payment/payment.component';
import { Customerform2Component } from './customerform2/customerform2.component';
import { NumberselectionComponent } from './numberselection/numberselection.component';
import { UserComponent } from './user/user.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'retailer/home',
    component: HeaderComponent,
    children: [
      { path: 'recharge', component: RechargeComponent },
      { path: '', component: RechargeComponent },
      { path: 'customerregister', component: CustomerregisterComponent },
      { path: 'status', component: StatustrackingComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'documentform', component: Customerform2Component },
      { path: 'numberselection', component: NumberselectionComponent },
    ]
  },
  {
    path: 'user/dashboard', component: UserComponent
  }
];