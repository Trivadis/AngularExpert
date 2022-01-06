import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@reactive-forms/reactive-forms/home').then(
        (m) => m.ReactiveFormsHomeModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('@reactive-forms/reactive-forms/about').then(
        (m) => m.ReactiveFormsAboutModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
