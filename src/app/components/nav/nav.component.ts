import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  visible: boolean = false;
  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.visible = true;
    }
  }
}
