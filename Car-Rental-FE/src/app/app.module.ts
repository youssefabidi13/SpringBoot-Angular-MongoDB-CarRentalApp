import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsingleComponent } from './components/productsingle/productsingle.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShopComponent } from './components/shop/shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { AddressComponent } from './components/address/address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionClientComponent } from './components/gestion-client/gestion-client.component';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { GestionManagerComponent } from './components/gestion-manager/gestion-manager.component';
import { FormEditUserComponent } from './components/form-edit-user/form-edit-user.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarByDateComponent } from './components/car-by-date/car-by-date.component';
import { CarDetaiComponent } from './components/car-detai/car-detai.component';
import { OrdersAcceptedComponent } from './components/orders-accepted/orders-accepted.component';
import { OrdersRefusedComponent } from './components/orders-refused/orders-refused.component';
import { RouterguardGuard } from './routerguard.guard';
import { AppRequestInterceptor } from './interceptors/app-request.interceptor';
import { LogoutComponent } from './components/logout/logout.component';
const routes: Routes = [
  { path:"", component:HomeComponent ,canActivate:[RouterguardGuard] },
  { path:"cart", component:CartComponent,canActivate:[RouterguardGuard]  },
  { path:"checkout", component:CheckoutComponent ,canActivate:[RouterguardGuard] },
  { path:"dashboard", component:DashboardComponent,canActivate:[RouterguardGuard]  },
  { path:"address", component:AddressComponent ,canActivate:[RouterguardGuard] },
  { path:"edit-address", component:EditAddressComponent ,canActivate:[RouterguardGuard] },
  { path:"forgot-password", component:ForgotPasswordComponent ,canActivate:[RouterguardGuard] },
  { path:"login", component:LoginComponent  },
  { path:"orders", component:OrdersComponent ,canActivate:[RouterguardGuard] },
  { path:"profile-details", component:ProfileDetailsComponent ,canActivate:[RouterguardGuard] },
  // { path:"product-single/:id", component:ProductsingleComponent },
  { path:"gestion-client", component:GestionClientComponent,canActivate:[RouterguardGuard] },
  { path:"product-single", component:ProductsingleComponent,canActivate:[RouterguardGuard]  },
  { path:"shop", component:ShopComponent ,canActivate:[RouterguardGuard] },
  { path:"signup", component:SignupComponent,canActivate:[RouterguardGuard]  },
  { path:"form-edit/:id", component:FormEditComponent ,canActivate:[RouterguardGuard] },
  { path:"client-details/:id", component:ClientDetailsComponent,canActivate:[RouterguardGuard] },
  { path:"gestion-manager", component:GestionManagerComponent,canActivate:[RouterguardGuard] },
  { path:"form-edit-user/:id", component:FormEditUserComponent,canActivate:[RouterguardGuard] },
  { path:"cars", component:CarsComponent,canActivate:[RouterguardGuard] },
  {path:"carbydate/:Ddebut/:Dfin",component:CarByDateComponent,canActivate:[RouterguardGuard] }, 
  {path:"carDetail/:id/:Ddebut/:Dfin",component:CarDetaiComponent,canActivate:[RouterguardGuard] },
  {path:"ordersAccepted",component:OrdersAcceptedComponent,canActivate:[RouterguardGuard] },
  {path:"ordersRefused",component:OrdersRefusedComponent,canActivate:[RouterguardGuard] },
  {path: "logout", component: LogoutComponent},

  //{ path:"**", redirectTo:"/login", pathMatch:"full"}
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    AddressComponent,
    EditAddressComponent,
    GestionClientComponent,
    FormEditComponent,
    ClientDetailsComponent,
    GestionManagerComponent,
    FormEditUserComponent,
    CarsComponent,
    CarByDateComponent,
    CarDetaiComponent,
    OrdersAcceptedComponent,
    OrdersRefusedComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
  HttpClientModule,
  SweetAlert2Module.forRoot(),
  ReactiveFormsModule,
    FormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],  exports: [RouterModule],

  providers: [{
   provide : HTTP_INTERCEPTORS,
   useClass : AppRequestInterceptor,
   multi : true
 },
 RouterguardGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
