import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageHomeComponent} from './pages/page-home/page-home.component';

const AppRoutes: Routes = [
  {
    path: 'modals',
    loadChildren: 'app/pages/page-modals/page-modals.module#PageModalsModule',
    data: {
      title: 'Modals page',
      order: 1
    }
  },
  // {
  //   path: 'grid',
  //   loadChildren: 'app/pages/grid/index#PageGridModule',
  //   data: {
  //     title: 'Grid page',
  //     order: 2
  //   }
  // },
  {
    path: '',
    component: PageHomeComponent,
    data: {
      title: 'Home page',
      order: 0
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
