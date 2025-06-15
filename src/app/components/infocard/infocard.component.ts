import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infocard',
  imports: [CommonModule],
  templateUrl: './infocard.component.html',
  styleUrl: './infocard.component.scss',
})
export class InfocardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon?: string;
}
