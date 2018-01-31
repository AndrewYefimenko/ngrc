import {
  Directive,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ComponentFactory, ComponentRef,
} from '@angular/core';
import {ModalService} from './modal.service';
import {ModalComponent} from './modal.component';
import {Subscription} from 'rxjs/Subscription';

@Directive({
  selector: '[modal]',
})
export class ModalDirective implements OnInit {
  @ViewChild('modal') modal;

  constructor(private vcr: ViewContainerRef,
              private cfr: ComponentFactoryResolver,
              private _ms: ModalService) {}

  ngOnInit() {
    this.vcr.clear();
    // subscribe to create event
    this._ms.create
      .subscribe(
        (data) => {
          this.create(data);
        }
      );
  }
  private create(config): void {
    // create component
    let factory: ComponentFactory<ModalComponent> = this.cfr.resolveComponentFactory(ModalComponent),
      component: ComponentRef<ModalComponent> = this.vcr.createComponent(factory),
      close$: Subscription;

    // pass modal config to instance
    component.instance.config = config;

    // close modal event subscription
    // handle user choice
    // unsubscribe and destroy component
    close$ = component.instance.close
      .subscribe(
        (output) => {
          this._ms.onEvent.next(output);
          close$.unsubscribe();
          component.destroy();
        }
      );
  }
}
