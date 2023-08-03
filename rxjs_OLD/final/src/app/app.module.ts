import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PollingComponent } from './polling/polling.component';

const routes = [
  {
    path: '',
    redirectTo: 'polling',
    pathMatch: 'full',
  },
  {
    path: 'polling',
    component: PollingComponent,
  },
];

@NgModule({
  declarations: [AppComponent, PollingComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
