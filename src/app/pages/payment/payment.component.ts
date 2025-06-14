import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { LoginDialogService } from '../../login-dialog.service';

@Component({
  selector: 'app-payment',
  imports: [NavComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  constructor(private loginDialogService: LoginDialogService) {}
  calculate() {
    this.loginDialogService.openCalculatedDialog();
  }
}
