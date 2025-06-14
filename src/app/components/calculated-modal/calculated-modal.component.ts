import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-calculated-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculated-modal.component.html',
  styleUrl: './calculated-modal.component.scss',
})
export class CalculatedModalComponent {
  price: number = 0;
  percent: number = 2;
  totalPrice: number = 0;
  constructor(private dialogRef: MatDialogRef<CalculatedModalComponent>) {}

  calculateTotal() {
    if (this.price != null && this.percent != null) {
      const percentValue = (this.price * this.percent) / 100;
      this.totalPrice = Math.round(this.price + percentValue + 20);
    } else {
      this.totalPrice = 0;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
