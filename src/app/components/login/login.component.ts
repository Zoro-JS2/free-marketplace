import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private dialogRef: MatDialogRef<LoginComponent>) {}
  email: string = '';
  password: string = '';
  login() {
    if (this.email && this.password) {
      // Сохраняем данные в sessionStorage (или localStorage)
      localStorage.setItem('user', JSON.stringify({ email: this.email }));

      // Закрываем окно после логина
      this.dialogRef.close();
      window.location.reload();
    } else {
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
