import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';

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
}
