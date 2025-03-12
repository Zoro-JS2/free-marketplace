import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginDialogService } from '../../login-dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  userEmail: string | null = null;
  constructor(private loginDialogService: LoginDialogService) {}

  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userEmail = JSON.parse(user).email;
    }
  }
  openLoginDialog() {
    this.loginDialogService.openLoginDialog();
  }
  logout() {
    localStorage.removeItem('user');
    this.userEmail = null;
    window.location.reload();
  }
}
