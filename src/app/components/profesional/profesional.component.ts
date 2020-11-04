import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profesional } from 'src/app/models/profesional';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private alertaAccesoDenegado: any;
  profesional: Profesional;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authSvc.getCurrentUserData('profesional').subscribe(profesionales => {
      this.profesional = profesionales[0];
      console.log(this.profesional);

      if (!this.profesional.habilitado) {
        if (!this.alertaAccesoDenegado) {
          Swal.fire({
            title: 'Acceso Denegado',
            text: `Este usuario debe estar aprobado para poder ingresar al sistema, contactese con un usuario administrador para continuar`,
            width: '500px',
            position: 'top',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEnterKey: false,
            allowEscapeKey: false,
            backdrop: true,
          });
        }
      }

      if (this.profesional.habilitado) {
        if (this.alertaAccesoDenegado) {
          this.alertaAccesoDenegado.close();
          this.alertaAccesoDenegado = null;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
