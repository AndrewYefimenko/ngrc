import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from "./layout/layout.component";

const imports$ = [
  CommonModule,
];
const declarations$ = [
  HeaderComponent
];
const exports$ = [
  LayoutComponent
];
const providers$ = [];

@NgModule({
  imports: imports$,
  declarations: [...declarations$, ...exports$],
  exports: exports$,
  providers: providers$
})
export class SharedComponentsModule {}
