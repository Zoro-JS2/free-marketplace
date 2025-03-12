import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { CreatecardComponent } from '../../components/createcard/createcard.component';
import { CardService } from '../../card.service';
@Component({
  selector: 'app-home',
  imports: [NavComponent, SearchbarComponent, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.loadProducts();
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
