import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action',
  imports: [
    NavComponent,
    CardComponent,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss',
})
export class ActionComponent {
  products: any[] = [];
  visibleAll: boolean = true;
  filteredProducts = this.products;
  saleProducts: any[] = [];
  ngOnInit() {
    const stored = localStorage.getItem('products');

    if (stored?.length == 0) {
      this.loadProducts();
    } else {
      this.products = stored ? JSON.parse(stored) : [];
    }
    const all = JSON.parse(localStorage.getItem('products') || '[]');
    this.saleProducts = all.filter((p: any) => p.isSale);
  }
  loadProducts() {
    const storedCards = JSON.parse(localStorage.getItem('products') || '[]');

    this.products = [
      {
        title: 'Ноутбук',
        info: 'Product description...',
        price: '31.000',
        status: false,
      },
      {
        title: 'Ноутбук',
        info: 'Product description...',
        price: '32.000',
        status: true,
      },
      ...storedCards, // Добавляем сохранённые карточки
    ];
  }
}
