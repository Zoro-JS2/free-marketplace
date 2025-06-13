import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginDialogService } from '../../login-dialog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  userEmail: string | null = null;
  constructor(private loginDialogService: LoginDialogService) {}
  @Output() searchTextChanged = new EventEmitter<string>();
  searchText: string = '';
  ngOnInit() {
    this.checkUser();
  }
  onSearch() {
    this.searchTextChanged.emit(this.searchText);
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
