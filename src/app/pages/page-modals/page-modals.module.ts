import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageModalsComponent} from './page-modals.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PageModalsComponent
  }
];

const imports$ = [
  CommonModule,
  RouterModule.forChild(routes)
];
const declarations$ = [
  PageModalsComponent
];
const exports$ = [];
const providers$ = [];

@NgModule({
  imports: imports$,
  declarations: declarations$,
  exports: exports$,
  providers: providers$
})
export class PageModalsModule {}
