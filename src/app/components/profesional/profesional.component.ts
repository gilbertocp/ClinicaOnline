import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NoAutorizadoModalComponent } from '../no-autorizado-modal/no-autorizado-modal.component';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {

  paciente;
  dialogRef;
  
  constructor(
    private authSvc: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSvc.user$.pipe(take(1)).subscribe(user => {
      console.log('Mi usuario => ',user);
      
      if(!user.habilitado) {
        this.dialogRef = this.dialog.open(NoAutorizadoModalComponent, {
          width: '600px',
          data: {
            emailVerificacion: false,
            email: user.correo,
            docId: user.docId
          },
          disableClose: true
        });
      }

      if(user.habilitado) {
        if(this.dialogRef) {
          this.dialogRef.close();
        }
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
