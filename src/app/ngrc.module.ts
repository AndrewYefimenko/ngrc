import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './ngrc-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedComponentsModule} from './shared/components/index';
import {NgrcComponent} from './ngrc.component';
import {PageHomeComponent} from './pages/page-home';
import {
  ModalService,
  ModalComponent,
  ModalDirective
} from './shared/modals';

@NgModule({
  declarations: [
    NgrcComponent,
    PageHomeComponent,
    ModalComponent,
    ModalDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule
  ],
  providers: [
    ModalService
  ],
  bootstrap: [
    NgrcComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class NgrcModule {
}
