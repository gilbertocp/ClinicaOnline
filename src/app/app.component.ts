import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animaciones } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [animaciones]
})
export class AppComponent {
  title = 'ClinicaOnline';

  prepararRuta(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
