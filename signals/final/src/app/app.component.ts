import { Component, OnInit, Signal, WritableSignal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BeerService } from './services/beer.service';
import { Observable } from 'rxjs';
import { BeerItem } from './model/beer.model';
import { CardComponent } from './components/card.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  beerService = inject(BeerService);
  title = 'Signals Demo';
  favCount: WritableSignal<number> = this.beerService.favCount;
  cartTotal: Signal<number> = this.beerService.cartTotal;
  availableBeers$?: Observable<BeerItem[]>;
  shippingCost = '';

  constructor() {
    // effect() can only be used within an injection context such as a constructor, a factory function, a field initializer.
    effect(() => {
      console.log(`The count is: ${this.favCount()}`);
      if (this.favCount() > 4) {
        this.shippingCost = 'Free!';
      } else {
        this.shippingCost = '30 CHF';
      }
    });
  }
  
  ngOnInit() {
    this.availableBeers$ = this.beerService.getBeerList();
  }

  updateFav(isLike: boolean) {
    this.beerService.updateFavCount(isLike);
  }

  setInCart(data: {beerItem: Partial<BeerItem>, isInCart: boolean}) {
    const {beerItem, isInCart} = data;
    if (!isInCart) {
      this.beerService.selectedBeers.update(selectedBeers => 
        selectedBeers.filter(sb => sb.id !== beerItem.id));
    } else {
      this.beerService.selectedBeers.update((beerItems) => [...beerItems, beerItem])
    }

    console.log(this.beerService.selectedBeers());
  }

  updateQty(updatedQty: {id: number, qty: number}) {
    this.beerService.selectedBeers.update(selectedBeers => 
      selectedBeers.map(sb => (sb.id === updatedQty.id) ? {...sb, qty: updatedQty.qty} : sb));
  }
}
