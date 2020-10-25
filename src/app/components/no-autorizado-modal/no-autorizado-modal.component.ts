import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-no-autorizado-modal',
  templateUrl: './no-autorizado-modal.component.html',
  styleUrls: ['./no-autorizado-modal.component.scss']
})
export class NoAutorizadoModalComponent implements OnInit {

  solicitudEnviada: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NoAutorizadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminSvc: AdminService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.data.emailVerificacion) {
      this.adminSvc.getSolicitud(this.data.docId).subscribe(solicitud => {
        if(solicitud.length === 0) {
          this.solicitudEnviada = false;
        }

        if(solicitud.length === 1) {
          this.solicitudEnviada = true;
        }
      });
    }
  }

  cerrarSesion(): void {
    this.dialogRef.close();
    this.authSvc.logout();
    this.router.navigate(['/iniciarSesion']);
  }

  enviarSolicitud(): void {
    this.adminSvc.enviarSolicitud(this.data.docId, this.data.email);
  }
}
