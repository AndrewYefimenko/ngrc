import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  ModalService,
  IModal,
  IModalEvent
} from '../../shared/modals';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Unsubscribe} from '../../shared/decorators';

@Unsubscribe()
@Component({
  templateUrl: './page-modals.component.html',
})
export class PageModalsComponent implements AfterViewInit {
  @ViewChild('simpleModal', { read: ElementRef }) simpleModal;
  @ViewChild('simpleModalSuccess', { read: ElementRef }) simpleModalSuccess;
  @ViewChild('simpleModalWarning', { read: ElementRef }) simpleModalWarning;
  @ViewChild('simpleModalError', { read: ElementRef }) simpleModalError;
  @ViewChild('chainModal', { read: ElementRef }) chainModal;
  simpleModalConfig: IModal = SimpleModalConfig;
  simpleModalConfigSuccess: IModal = SimpleModalConfigSuccess;
  simpleModalConfigWarning: IModal = SimpleModalConfigWarning;
  simpleModalConfigError: IModal = SimpleModalConfigError;
  chainModalConfig: IModal = ChainModalConfig;
  simpleModals$: Subscription;
  chainModal$: Subscription;

  constructor(private ms: ModalService) {
  }

  ngAfterViewInit() {
    this.simpleModals$ = Observable
      .merge(
        Observable.fromEvent(this.simpleModal.nativeElement, 'click'),
        Observable.fromEvent(this.simpleModalSuccess.nativeElement, 'click'),
        Observable.fromEvent(this.simpleModalWarning.nativeElement, 'click'),
        Observable.fromEvent(this.simpleModalError.nativeElement, 'click'),
      )
      .map(($event: Event) => {
        $event.stopPropagation();
        return $event.target['name'];
      })
      .subscribe(
        (name) => {
          switch (name) {
            case 'simpleModal':
              this.createModal(this.simpleModalConfig);
              break;
            case 'simpleModalSuccess':
              this.createModal(this.simpleModalConfigSuccess);
              break;
            case 'simpleModalWarning':
              this.createModal(this.simpleModalConfigWarning);
              break;
            case 'simpleModalError':
              this.createModal(this.simpleModalConfigError);
              break;
          }
        }
      );

    this.chainModal$ = Observable.fromEvent(this.chainModal.nativeElement, 'click')
      .subscribe(
        (event: Event) => {
          event.preventDefault();
          this.createModal(this.chainModalConfig);
        }
      );
  }

  createModal(config: IModal): void {
    const modalEvent$ = this.ms.createModal(config)
      .subscribe(
        (event: IModalEvent) => {
          // handle user event
          console.log(event);
          modalEvent$.unsubscribe();
          this.handleUserEvent(event);
        }
      );
  }

  private handleUserEvent(event) {
    switch (event.type) {
      case 'next':
        this.createModal(this.simpleModalConfig);
        break;
    }
  }
}

const SimpleModalConfig: IModal = {
  id: 'simpleModal',
  data: {
    title: 'Simple Modal',
    type: 'info',
    text: ['simple modal lorem ipsum'],
    buttons: [
      {
        text: 'Ok',
        action: 'confirm',
        cssClasses: 'btn btn-dark'
      },
      {
        text: 'Close',
        action: 'close',
        cssClasses: 'btn btn-danger'
      }
    ]
  }
};
const SimpleModalConfigSuccess: IModal = {
  id: 'simpleModalSuccess',
  data: {
    title: 'Success',
    type: 'success',
    text: ['simple modal lorem ipsum'],
    buttons: [
      {
        text: 'Ok',
        action: 'confirm',
        cssClasses: 'btn btn-dark'
      },
      {
        text: 'Close',
        action: 'close',
        cssClasses: 'btn btn-danger'
      }
    ]
  }
};
const SimpleModalConfigWarning: IModal = {
  id: 'simpleModalWarning',
  data: {
    title: 'Warning',
    type: 'warning',
    text: ['simple modal lorem ipsum'],
    buttons: [
      {
        text: 'Ok',
        action: 'confirm',
        cssClasses: 'btn btn-dark'
      },
      {
        text: 'Close',
        action: 'close',
        cssClasses: 'btn btn-danger'
      }
    ]
  }
};
const SimpleModalConfigError: IModal = {
  id: 'simpleModalError',
  data: {
    title: 'Error',
    type: 'error',
    text: ['simple modal lorem ipsum'],
    buttons: [
      {
        text: 'Ok',
        action: 'confirm',
        cssClasses: 'btn btn-dark'
      },
      {
        text: 'Close',
        action: 'close',
        cssClasses: 'btn btn-danger'
      }
    ]
  }
};

const ChainModalConfig: IModal = {
  id: 'chainModal',
  data: {
    title: 'Chain Modal',
    type: 'error',
    text: ['chain modal text', 'some more text'],
    buttons: [
      {
        text: 'Next',
        action: 'next',
        cssClasses: 'btn btn-success'
      },
      {
        text: 'Close',
        action: 'close',
        cssClasses: 'btn btn-danger'
      }
    ]
  }
};
