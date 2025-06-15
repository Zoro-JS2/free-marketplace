import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ActionComponent } from './pages/action/action.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatecardComponent } from './components/createcard/createcard.component';
import { OrderComponent } from './components/order/order.component';
import { InfobayComponent } from './components/infobay/infobay.component';
import { StoreComponent } from './components/store/store.component';
import { VacantionsComponent } from './components/vacantions/vacantions.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'action', component: ActionComponent },
  { path: 'createcard', component: CreatecardComponent },
  { path: 'infobay', component: InfobayComponent },
  { path: 'store', component: StoreComponent },
  { path: 'vacantions', component: VacantionsComponent },
  { path: 'order', component: OrderComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
