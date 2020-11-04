import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo: string;
  clave: string;
  ocultar = true;
  enEspera = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  usuarioSeleccionado({currentTarget}) {
    switch(currentTarget.value) {
      case 'administrador':
        this.correo = 'admin@admin.com';
        this.clave = '111111';
      break;

      case 'profesional':
        this.correo = 'profesional@profesional.com';
        this.clave = '111111';
      break;

      case 'paciente':
        this.correo = 'mywudduhe-8193@yopmail.com';
        this.clave = '111111';
      break;
    }
  }

  iniciarSesion(): void {
    this.enEspera = true;

    this.authSvc.login(this.correo, this.clave).then(() => {
      localStorage.setItem('login_user_clinica_online', Math.random().toString(36).slice(-8));
      this.router.navigate(['perfil']);
    })
    .catch(() => {
      this.enEspera = false;
      this.mostrarAlert('No se ha podio iniciar sesión, por favor verifique que los campos sean correctos', 2500);
    });
  
  }

  mostrarAlert(errMsj: string, duracion: number = 1000): void {
    const alert = document.querySelector('#alert-form');
    document.querySelector('#alert-text').innerHTML = errMsj;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), duracion);
  }

}
