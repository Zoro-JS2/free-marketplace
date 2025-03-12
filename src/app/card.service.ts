import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private productsSource = new BehaviorSubject<any[]>([
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
    {
      title: 'Ноутбук',
      info: 'Product description...',
      price: '32.000',
      status: true,
    },
    {
      title: 'Ноутбук',
      info: 'Product description...',
      price: '32.000',
      status: true,
    },
  ]);

  products$ = this.productsSource.asObservable();

  addProduct(product: any) {
    const currentProducts = this.productsSource.value;
    this.productsSource.next([...currentProducts, product]);
  }
}
