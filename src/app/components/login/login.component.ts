import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  errMsj: string;
  ocultar = true;
  enEspera = false;
  siteKey = environment.captchaKey;
  captchaVerificado: boolean = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  usuarioSeleccionado(e: any) {
    switch(e.value) {
      case 'administrador':
        this.correo = 'admin@admin.com';
        this.clave = 'admin1234';
      break;

      case 'profesional':
        this.correo = 'profesional@profesional.com';
        this.clave = 'profesional1234';
      break;

      case 'paciente':
        this.correo = 'paciente@paciente.com';
        this.clave = 'paciente1234';
      break;
    }
  }

  iniciarSesion(): void {
    
    if(!this.captchaVerificado) {
      this._snackBar.open('Por favor verifique el captcha', 'X', {
        duration: 2000
      });
      return;
    }

    this.authSvc.login(this.correo, this.clave).then(() => {
      localStorage.setItem('login_user_clinica_online', Math.random().toString(36).slice(-8));
      this.router.navigate(['perfil']);
    })
    .catch(() => {
      this._snackBar.open('No se ha podido iniciar sesión, verifique que el usuario y la clave sean correctos', 'X', {
        duration: 3000
      });
    })
    .finally(() => {
      this.enEspera = false;
    });
  }

}
