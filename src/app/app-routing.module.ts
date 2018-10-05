import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StageComponent } from './stage/stage.component';

const routes: Routes = [
  {
    path: '',
    component: StageComponent,
    data: {
      title: 'Game Test App',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
