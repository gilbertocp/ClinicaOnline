import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  correo: string;
  clave: string;
  enEspera: boolean = false;

  constructor(
    private adminSvc: AdminService,
    private authSvc: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.adminSvc.getSolicitudes().subscribe(solicitudes => {
      this.solicitudes = solicitudes;
      console.log(solicitudes);
    });
  }

  cerrarSesion(): void {
    this.authSvc.logout();
    this.router.navigate(['/iniciarSesion']);
  }

  aprobarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.aprobarSolicitud(solicitud);
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.rechazarSolicitud(solicitud);
  }

  registrarAdministrador(): void {
    this.enEspera = true;

    this.authSvc.register(this.correo, this.clave).then(cred => {
      this.adminSvc.registrarAdministradorId(cred.user.uid,{
        correo: this.correo,
        clave: this.clave,
        perfil: 'administrador',
        habilitado: true
      });
    })
    .catch(() => {
      this._snackBar.open('No se ha podido registrar el usuario, por favor revise que los campos esten correctos', 'X',{
        duration: 2000
      });
    })
    .finally(() => {
      this.correo = '';
      this.clave = '';
      this.enEspera = false;
    }); 
  }
}
