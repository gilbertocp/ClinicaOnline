import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NoAutorizadoModalComponent } from '../no-autorizado-modal/no-autorizado-modal.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  userFirebase$;
  dialogRef;
  paciente;

  constructor(
    private authSvc: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSvc.getCurrentUser().subscribe(user => {
      
      if(user.emailVerified) {
        if(this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef = null;
        }
      }

      if(!user.emailVerified) {
        this.dialogRef = this.dialog.open(NoAutorizadoModalComponent, {
          width: '600px',
          data: {
            emailVerificacion: true,
            email: user.email,
          },
          disableClose: true
        });
      }
    });

    this.authSvc.user$.subscribe(user => {
      this.paciente = user;
    });
  }


  cerrarSesion(): void {
    this.authSvc.logout();
    this.router.navigate(['/iniciarSesion']);
  }
}
