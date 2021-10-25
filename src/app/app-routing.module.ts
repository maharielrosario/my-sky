import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CitiesOverviewComponent } from './cities-overview/cities-overview.component';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
