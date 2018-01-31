export interface IModal {
  id: string;
  data: IModalData;
}
export interface IModalData {
  title: string;
  type?: 'warning' | 'error' | 'success' | 'info';
  text: string | Array<string>;
  buttons: IModalButton[];
  styles?: {[key: string]: any};
  animation?: string;
}
export interface IModalButton {
  text: string;
  action: string;
  cssClasses: string;
}
export interface IModalEvent {
  id: string;
  type: string;
}
