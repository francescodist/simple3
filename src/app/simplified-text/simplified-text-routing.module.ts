import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimplifiedTextPage } from './simplified-text.page';

const routes: Routes = [
  {
    path: '',
    component: SimplifiedTextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimplifiedTextPageRoutingModule {}
