import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { Profesional } from 'src/app/models/profesional';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit, OnDestroy {

  paciente: Paciente;
  profesionales: Profesional[];
  alertaConfirmarCorreo: any;
  private subscriptions: Subscription[] = [];

  constructor(private authSvc: AuthService) {  }

  ngOnInit(): void {
    this.subscriptions.push(

      this.authSvc.getCurrentUserData('paciente').subscribe(user => {
        this.paciente = user[0];  
        console.log(this.paciente);
      }),

      this.authSvc.getCurrentUser().subscribe(user => {
        if(!user.emailVerified)  {
          this.alertaConfirmarCorreo = Swal.fire({
            title: 'Acceso Denegado',
            text: `Se ha enviado un email de confirmación a ${user.email}, Por favor confirme su correo electrónico para ingresar al sistema`,
            width: '500px',
            position: 'top',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEnterKey: false,
            allowEscapeKey: false,
            backdrop: true,
          });
        } 
        
        if(user.emailVerified) {
          if(this.alertaConfirmarCorreo) {
            this.alertaConfirmarCorreo.close();
            this.alertaConfirmarCorreo = null;
          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
