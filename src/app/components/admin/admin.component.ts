import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  solicitudes = [];
  enEspera = false;

  constructor(
    private adminSvc: AdminService,
    private authSvc: AuthService,
  ) { }

  ngOnInit(): void {
    this.adminSvc.getSolicitudes().subscribe(solicitudes => {
      this.solicitudes = solicitudes;
      console.log(solicitudes);
    });
  }

  aprobarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.aprobarSolicitud(solicitud);
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.rechazarSolicitud(solicitud);
  }

  registrarAdministrador(correo: string, clave: string): void {
    this.enEspera = true;

    this.authSvc.register(correo, clave).then(cred => {
      this.adminSvc.registrarAdministradorId(cred.user.uid, {
        correo,
        clave,
        perfil: 'administrador',
      });

      this.mostrarAlert('Se ha registrado el usuario exitosamente');
    })
    .catch(() => {
      this.mostrarAlert('No se ha podido registrar el usuario, por favor revise que los campos esten correctos', 2500);
    })
    .finally(() => {
      this.enEspera = false;
    });
  }

  mostrarAlert(errMsj: string, duracion: number = 1000): void {
    const alert = document.querySelector('#alert-form');
    document.querySelector('#alert-text').innerHTML = errMsj;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), duracion);
  }
}
