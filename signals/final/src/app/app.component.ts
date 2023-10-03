import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BeerService } from './services/beer.service';
import { Observable } from 'rxjs';
import { BeerResponse } from './model/beer.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Signals Demo';
  availableBeers$?: Observable<BeerResponse[]>;

  beerService = inject(BeerService);

  ngOnInit() {
    this.availableBeers$ = this.beerService.getBeerList();
  }
}
