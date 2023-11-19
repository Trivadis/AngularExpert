import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BeerItem } from '../model/beer.model';
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
  @Input({ required: true }) beer!: BeerItem;
  @Output() onLiked = new EventEmitter<boolean>();
  @Output() onSetInCart = new EventEmitter<{beerItem: Partial<BeerItem>, isInCart: boolean}>();
  @Output() onQtyUpdate = new EventEmitter<{id: number, qty: number}>();

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
    this.onSetInCart.emit({beerItem: {id: this.beer.id, qty: this.qtySelected, price: this.beer.price}, isInCart: this.isInCart});
    if (!this.isInCart){
      this.qtySelected = 1; 
    }
  }

  updateQty(qtySelected: number) {
    this.isInCart && this.onQtyUpdate.emit({id: this.beer.id, qty: qtySelected});
  }

}
