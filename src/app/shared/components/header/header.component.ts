import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface IHeaderLink {
  path: string;
  title: string;
}

@Component({
  selector: 'ngrc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('navButton') navButton;
  @ViewChild('nav') nav;
  path: BehaviorSubject<any> = new BehaviorSubject('');
  navIsOpen = false;
  public headerLinks = [];

  constructor(private router: Router, ) {}

  ngOnInit() {
    this.headerLinks = this.mapConfigToLinks(this.router.config.reverse());
  }
  ngAfterViewInit() {
    this.subscriptions();
  }

  private subscriptions(): void {
    // close nav on route change
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.path.next(event.url.slice(1));
        this.toggleNav();
      });

    // toggle nave on user events
    Observable
      .merge(
        Observable.fromEvent(this.navButton.nativeElement, 'click'),
        Observable.fromEvent(this.nav.nativeElement, 'mouseleave')
      )
      .map((event: Event) => event.type)
      .subscribe(
        (type) => {
          switch (type) {
            case 'click':
              this.toggleNav(true);
              break;
            default:
              this.toggleNav();
              break;
          }
        }
      );
  }

  private toggleNav(isOpen: boolean = false): void {
    this.navIsOpen = isOpen;
  }

  public onLinkClick($event, path) {
    $event.preventDefault();
    $event.stopPropagation();
    let pathToNavigate = ['/'];
    if (!!path) {
      pathToNavigate.push(path);
    }
    this.router.navigate(pathToNavigate);
  }

  private mapConfigToLinks(config): IHeaderLink[] {
    return config
      .sort((x, y) => x.order > y.order)
      .map((item) => ({
        path: item.path,
        title: item.data.title
      }));
  }
}
