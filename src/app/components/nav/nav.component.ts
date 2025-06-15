import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  isDropdownOpen = false;

  constructor(private cardService: CardService) {}
  ngOnInit() {
    this.checkUser();
    this.cardService.cartItems$.subscribe((items) => {
      this.cartCount = items.length;
    });
  }
  checkUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      this.visible = !!user;
    } else {
      this.visible = false;
    }
  }
  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    this.isDropdownOpen = false;
  }
}
