import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  visible: boolean = false;
  cartCount = 0;

  constructor(private cardService: CardService) {}
  ngOnInit() {
    this.checkUser();
    this.cardService.cartItems$.subscribe((items) => {
      this.cartCount = items.length;
    });
  }
  checkUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.visible = true;
    }
  }
}
