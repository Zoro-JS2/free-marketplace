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
  private cartItemsSubject = new BehaviorSubject<any[]>(
    this.getCartFromLocalStorage()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  private getCartFromLocalStorage(): any[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('selectedProducts');
      return stored ? JSON.parse(stored) : [];
    }
    return []; // безопасный fallback
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.length;
  }

  addToCart(product: any): void {
    const current = this.cartItemsSubject.value;
    const updated = [...current, product];
    this.cartItemsSubject.next(updated);
    localStorage.setItem('selectedProducts', JSON.stringify(updated));
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('selectedProducts');
  }
}
