import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import {
  IModal,
  IModalButton, IModalData
} from './modal.model';
import {
  fadeInAnimation
} from './modal.animations';

@Component({
  selector: 'ngrc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', { read: ElementRef }) modal: ElementRef;
  @ViewChild('modalContent', { read: ElementRef }) modalContent: ElementRef;
  config: IModal;
  close: EventEmitter<any> = new EventEmitter();
  title: string;
  body: Array<string>;
  buttons: IModalButton[];

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit() {
    this.setModalData();
  }

  ngAfterViewInit() {
    let type = this.config.data.type;
    if (!!type) {
      this.setModalType(type)
    }
  }

  public btnClick(event, action) {
    event.stopPropagation();
    this.close.emit({
      id: this.config.id,
      type: action
    });
  }

  private setModalData(): void {
    let data: IModalData = this.config.data;

    this.title = data.title;
    this.body = this.setModalBody(data.text);
    this.buttons = data.buttons;
  }

  private setModalType(type) {
    let el = this.modalContent.nativeElement,
      bc = this.selectBackgroundColor(type);

    this._renderer.setStyle(el, 'background-color', bc);
  }

  private selectBackgroundColor(type) {
    switch (type) {
      case 'warning':
        return '#fff3cd';
      case 'error':
        return '#f8d7da';
      case 'info':
        return '#cce5ff';
      case 'success':
        return '#d4edda';
      default:
        return '#fff';
    }
  }

  private setModalBody(bodyDataRaw): Array<string> {
    let bodyDataType = typeof bodyDataRaw;

    if ( bodyDataType === 'object' && Array.isArray(bodyDataRaw) ) {
      return bodyDataRaw;
    } else if (bodyDataType === 'string') {
      return [bodyDataRaw];
    }
    return [];
  }
}
