import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { CreatecardComponent } from '../../components/createcard/createcard.component';
import { CardService } from '../../card.service';
@Component({
  selector: 'app-home',
  imports: [NavComponent, SearchbarComponent, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: any[] = [];

  constructor(private cardService: CardService) {}
  ngOnInit() {
    this.cardService.products$.subscribe((data) => {
      this.products = data;
    });
  }
}
