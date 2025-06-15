import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { InfocardComponent } from '../infocard/infocard.component';

@Component({
  selector: 'app-infobay',
  imports: [NavComponent, InfocardComponent],
  templateUrl: './infobay.component.html',
  styleUrl: './infobay.component.scss',
})
export class InfobayComponent {}
