import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() perfil;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this.authSvc.logout();
  }
}
