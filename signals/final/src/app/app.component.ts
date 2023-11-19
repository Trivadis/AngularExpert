import { Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BeerService } from './services/beer.service';
import { Observable } from 'rxjs';
import { BeerResponse, SelectedBeer } from './model/beer.model';
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
  favCount: WritableSignal<number> = signal(0);
  availableBeers$?: Observable<BeerResponse[]>;
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

  addLike(isLike: boolean) {
    this.favCount.update(count => isLike ? count + 1 : count - 1);
  }

  setInCart(data: SelectedBeer) {
    console.log({data});
  }
}
