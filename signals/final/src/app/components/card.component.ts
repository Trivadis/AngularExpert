import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerResponse } from '../model/beer.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() beer?: BeerResponse;

}
