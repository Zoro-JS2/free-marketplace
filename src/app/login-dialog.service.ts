import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { CalculatedModalComponent } from './components/calculated-modal/calculated-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoginDialogService {
  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: false,
    });
  }
  openCalculatedDialog(): void {
    this.dialog.open(CalculatedModalComponent, {
      width: '400px',
      disableClose: false,
    });
  }
}
