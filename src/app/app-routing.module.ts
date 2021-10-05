import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesOverviewComponent } from './cities-overview/cities-overview.component';

const routes: Routes = [
  {
    path: 'cities',
    component: CitiesOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
