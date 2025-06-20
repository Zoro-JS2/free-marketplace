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
  visibleAll: boolean = true;
  filteredProducts = this.products;
  constructor(private cardService: CardService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('products');

      if (!stored || stored.length === 0) {
        this.loadProducts();
      } else {
        this.products = JSON.parse(stored);
      }
    } else {
      this.products = [];
    }
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
  onSearchInputChanged(searchText: string) {
    this.visibleAll = false;
    const lowerSearch = searchText.toLowerCase();
    this.filteredProducts = this.products.filter((storedCards) =>
      storedCards.title.toLowerCase().includes(lowerSearch)
    );
  }
  ClearFilter() {
    this.visibleAll = true;
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes()
    );
  }
  onCardDeleted(id: string): void {
    const updated = this.products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updated));
    this.products = updated;
  }
}
