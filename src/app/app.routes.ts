import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ActionComponent } from './pages/action/action.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatecardComponent } from './components/createcard/createcard.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'action', component: ActionComponent },
  { path: 'createcard', component: CreatecardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
