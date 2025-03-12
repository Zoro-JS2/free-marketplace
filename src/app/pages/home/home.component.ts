import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  imports: [NavComponent, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
