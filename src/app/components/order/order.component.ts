import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { LoginDialogService } from '../../login-dialog.service';
import { LoginComponent } from '../login/login.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  imports: [NavComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  selectedProducts: any[] = [];
  visible: boolean = false;

  constructor(
    private loginDialogService: LoginDialogService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('selectedProducts');
    this.selectedProducts = stored ? JSON.parse(stored) : [];

    this.checkUser();
  }
  checkUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.visible = true;
    }
  }
  clearCart() {
    if (this.visible == true) {
      localStorage.removeItem('selectedProducts');
      this.selectedProducts = [];
      window.location.reload();
    } else {
      this.loginDialogService.openLoginDialog();
    }
  }
  confirmDelete(index: number): void {
    const confirmed = window.confirm(
      'Ви впевнені, що хочете видалити цей товар?'
    );
    if (confirmed) {
      this.selectedProducts.splice(index, 1); // удаляем из массива
      localStorage.setItem(
        'selectedProducts',
        JSON.stringify(this.selectedProducts)
      ); // сохраняем
      window.location.reload();
    }
  }
}
