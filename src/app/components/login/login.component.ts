import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: 'No se ha podido iniciar sesión, verifique que los campos sean correctos',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    });
  
  }

}
