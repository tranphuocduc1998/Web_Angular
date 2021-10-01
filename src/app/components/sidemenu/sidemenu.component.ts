import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-sidemenu-component',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidemenuComponent implements OnInit {
  @Input() items?: any;
  @Input() color?: 'bg-primary' | 'bg-secondary' | 'bg-success' | 'bg-danger' | 'bg-warning' | 'bg-info' | 'bg-light' | 'bg-dark' | 'bg-body' | 'bg-white' | 'bg-transparent' = 'bg-primary';

  currentRoute: string = '';

  constructor(public route: Router) {
    this.currentRoute = '/' + route.url.split('/')[1];
  }

  ngOnInit() {
    this.route.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
