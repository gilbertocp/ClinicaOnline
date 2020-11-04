import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit, OnDestroy {

  paciente: Paciente;
  authUser: firebase.User;
  profesionales: Profesional[];
  mostrarTurnoAlert: boolean = false;
  btnConfirmarElement: HTMLButtonElement;
  private subscriptions: Subscription[] = [];

  constructor(
    private authSvc: AuthService,
    private turnosSvc: TurnosService  
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(

      this.authSvc.getCurrentUserData('paciente').subscribe(user => {
        this.paciente = user[0];  
        console.log(this.paciente);
      }),

      this.authSvc.getCurrentUser().subscribe(user => {
        this.authUser = user;
  
        if(!user.emailVerified)  {
          this.btnConfirmarElement = document.querySelector('#btnConfirmarCorreo') as HTMLButtonElement;
          this.btnConfirmarElement.click();
        } else {
          if(this.btnConfirmarElement) {
            this.btnConfirmarElement.click();
            this.btnConfirmarElement = null;
          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
