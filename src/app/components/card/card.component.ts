import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardService } from '../../card.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title!: string;
  @Input() info!: string;
  @Input() price!: string;
  @Input() status!: boolean;
  @Input() image!: string;
  @Input() id!: string;
  @Output() deleted = new EventEmitter<string>();
  visible: boolean = false;
  editing: boolean = false;
  oldPrice = '';
  editedInfo = '';
  editedPrice = '';
  tempPrice: string = '';
  constructor(private CardService: CardService) {}
  ngOnInit() {
    this.checkUser();
    this.oldPrice = this.price;
    this.editedInfo = this.info;
    this.editedPrice = this.price;
  }
  editCard() {
    if (!this.editing) {
      // Входим в режим редактирования
      this.tempPrice = this.price;
      this.editing = true;
    } else {
      // Выходим из режима, применяем новую цену
      this.price = this.tempPrice;
      this.editing = false;
    }
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
      this.deleted.emit(this.id);
    }
  }
}
