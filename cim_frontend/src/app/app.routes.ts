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
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Routes } from '@angular/router';
import { RetailerComponent } from './retailer/retailer.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SessionLogsComponent } from './session-logs/session-logs.component';
import { PlansComponent } from './plans/plans.component';
import { DocumentComponent } from './document/document.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { AdminComponent } from './admin/admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { AdminRetailerComponent } from './admin-retailer/admin-retailer.component';
import { ReportComponent } from './report/report.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CurrentPlanComponent } from './current-plan/current-plan.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { CallHistoryComponent } from './call-history/call-history.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { NotificationPageComponent } from './notificationpage/notificationpage.component';
import { RetailerDashboardComponent } from './retailerdashboard/retailerdashboard.component';
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
  {
    path: 'admin',
    component: AdminloginComponent
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
      { path: 'retailerdashboard', component: RetailerDashboardComponent },
    ]
  },
  {
    path: 'user/dashboard', component: UserComponent,
    children:
    [
      { path: '', redirectTo: 'view-profile', pathMatch: 'full' },
      { path: 'view-profile', component: CustomerViewComponent },
      { path: 'update-profile', component: CustomerEditComponent },
      { path: 'current-plan', component: CurrentPlanComponent },
      { path: 'plans', component: AllPlansComponent },
      { path: 'call-history', component: CallHistoryComponent },
      { path: 'payment/:planId', component: PaymentGatewayComponent },
      { path: 'notifications', component: NotificationPageComponent }
    ]
  },
  {
    path: 'admin/home',
    component: AdminComponent,
    children: [
      { path: '', component: UserAdminComponent }, // Default child route
      { path: 'retailer', component: AdminRetailerComponent },
      { path: 'resetpassword/:retailerId', component: ResetpasswordComponent }, // <-- param added here
      { path: 'session-logs', component: SessionLogsComponent },
      {path:'resetpassword',component:ResetpasswordComponent},
      { path: 'plans', component: PlansComponent },
      { path: 'document', component: DocumentComponent },
      {path:'dashboard',component:DashboardComponent},
      {path:'report',component:ReportComponent},
        { path: 'admin/home/retailers', component: RetailerComponent },
        {path:'usermanagement',component:UsermanagementComponent},
        { path: 'notifications', component:AdminNotificationsComponent
},
  { path: 'admin/home/resetpassword/:retailerId', component: ResetpasswordComponent }
    ],
  },

];