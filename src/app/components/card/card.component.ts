import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardService } from '../../card.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title!: string;
  @Input() info!: string;
  @Input() price!: string;
  @Input() status!: boolean;
  @Input() image!: string;
  @Output() deleted = new EventEmitter<string>();
  visible: boolean = false;
  constructor(private CardService: CardService) {}
  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.visible = true;
    }
  }
  addToOrder() {
    const product = {
      title: this.title,
      info: this.info,
      price: this.price,
      status: this.status,
      image: this.image,
    };

    const existing = JSON.parse(
      localStorage.getItem('selectedProducts') || '[]'
    );
    existing.push(product);
    localStorage.setItem('selectedProducts', JSON.stringify(existing));
    this.CardService.addToCart(product);
  }
  confirmDelete() {
    const confirmed = window.confirm(
      'Ви впевнені, що хочете видалити цей товар?'
    );
    if (confirmed) {
      this.deleted.emit(this.title);
    }
  }
}
