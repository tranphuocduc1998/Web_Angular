import { Component } from '@angular/core';
import { AuthServices } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public authService: AuthServices) {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
