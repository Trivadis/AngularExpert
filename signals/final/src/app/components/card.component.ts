import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BeerResponse, SelectedBeer } from '../model/beer.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true }) beer!: BeerResponse;
  @Output() onLiked = new EventEmitter<boolean>();
  @Output() onSetInCart = new EventEmitter<SelectedBeer>();

  isLiked = false;
  isInCart = false;
  ordersQuantity = [1, 2, 3, 4, 5];
  qtySelected = this.ordersQuantity[0];

  like() {
    this.isLiked = !this.isLiked;
    this.onLiked.emit(this.isLiked);
  }

  setInCart() {
    this.isInCart = !this.isInCart;
    this.onSetInCart.emit({ addToCart: this.isInCart, id: this.beer.id, price: this.beer.price, qty: this.qtySelected });
  }

  updateQty(qtySelected: number) {
    this.isInCart && this.onSetInCart.emit({ addToCart: this.isInCart, id: this.beer.id, price: this.beer.price, qty: qtySelected });
  }

}
