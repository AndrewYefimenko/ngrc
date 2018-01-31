import {Subject} from 'rxjs/Subject';
import {
  IModal, IModalEvent,
} from './modal.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ModalService {
  public create: Subject<IModal> = new Subject();
  public onEvent: Subject<IModalEvent> = new Subject();

  // Create modal and return subject
  createModal(data: IModal): Observable<IModalEvent> {
    this.create.next(data);
    return this.onEvent.filter(event => event.id === data.id);
  }
}
