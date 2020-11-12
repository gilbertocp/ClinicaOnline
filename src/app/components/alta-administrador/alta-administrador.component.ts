import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.component.html',
  styleUrls: ['./alta-administrador.component.scss']
})
export class AltaAdministradorComponent implements OnInit {

  enEspera = false;

  constructor(
    private authSvc: AuthService,
    private adminSvc: AdminService  
  ) { }

  ngOnInit(): void {
  }

  registrarAdministrador(correo: string, clave: string): void {
    this.enEspera = true;

    this.authSvc.register(correo, clave).then(cred => {
      this.adminSvc.registrarAdministradorId(cred.user.uid, {
        correo,
        clave,
        perfil: 'administrador',
      });

      Swal.fire({
        icon: 'success',
        title: 'Se ha registrado el usuario exitosamente'
      });
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido registrar el usuario, por favor revise que los campos esten correctos'
      });
    })
    .finally(() => {
      this.enEspera = false;
    });
  }

}
