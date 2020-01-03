import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectDetailsPage } from './subject-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectDetailsPageRoutingModule {}
