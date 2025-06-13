import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [NavComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  selectedProducts: any[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('selectedProducts');
    this.selectedProducts = stored ? JSON.parse(stored) : [];
  }
  clearCart() {
    localStorage.removeItem('selectedProducts');
    this.selectedProducts = [];
    window.location.reload();
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
