import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  enEspera: boolean;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });
  }

  async iniciarSesion(): Promise<void> {
    this.enEspera = true;

    const {correo, clave} = this.formulario.value;
    
    try {
      await this.authSvc.login(correo, clave);
      this.router.navigate(['/perfil']);
    } catch(err) {
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: 'No se ha podido iniciar sesión, verifique que los campos sean correctos',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      this.enEspera = false;
    }
  }

  usuarioSeleccionado({currentTarget}) {
    switch (currentTarget.value) {
      case 'administrador':
        this.formulario.setValue({
          correo: 'admin@admin.com',
          clave: '111111'
        });
      break;

      case 'profesional':
        this.formulario.setValue({
          correo: 'micorreo@gmail.com',
          clave: '222222'
        }) ;
        break;

      case 'paciente':
        this.formulario.setValue({
          correo:'iloppalledd-3751@yopmail.com',
          clave: '111111'
        });
        break;
    }
  }
}
