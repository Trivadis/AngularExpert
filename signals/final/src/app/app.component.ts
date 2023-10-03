import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BeerService } from './services/beer.service';
import { Observable } from 'rxjs';
import { BeerResponse } from './model/beer.model';
import { CardComponent } from './components/card.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Signals Demo';
  favCount: WritableSignal<number> = signal(0);
  availableBeers$?: Observable<BeerResponse[]>;
  
  beerService = inject(BeerService);
  
  ngOnInit() {
    this.availableBeers$ = this.beerService.getBeerList();
  }
}
