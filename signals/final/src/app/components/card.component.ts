import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { BeerResponse } from '../model/beer.model';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() beer?: BeerResponse;

  @Output() onSelected = new EventEmitter<boolean>();

  isLiked = false;

  like() {
    this.isLiked = !this.isLiked;
    this.onSelected.emit(this.isLiked);
  }

}
