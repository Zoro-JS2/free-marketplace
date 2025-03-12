import { Component, EventEmitter, Output } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-createcard',
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './createcard.component.html',
  styleUrl: './createcard.component.scss',
})
export class CreatecardComponent {
  title = '';
  info = '';
  price = '';
  imageUrl: string | ArrayBuffer | null = null; // Для хранения изображения

  constructor(private cardService: CardService) {}

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  publishCard() {
    if (!this.title || !this.info || !this.price) {
      alert('Будь ласка, заповніть всі поля!');
      return;
    }

    const newCard = {
      title: this.title,
      info: this.info,
      price: this.price,
      status: false,
      imageUrl: this.imageUrl,
    };

    // Получаем текущие карточки, добавляем новую и сохраняем
    const storedCards = JSON.parse(localStorage.getItem('products') || '[]');
    storedCards.push(newCard);
    localStorage.setItem('products', JSON.stringify(storedCards));

    // Очищаем форму
    this.title = '';
    this.info = '';
    this.price = '';
    this.imageUrl = null;

    alert('Карточка успішно опублікована!');
  }
}
