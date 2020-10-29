import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
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
export class PacienteComponent implements OnInit {

  paciente: Paciente;
  authUser$: Observable<User>;
  profesionales: Profesional[];
  mostrarTurnoAlert: boolean = false;

  constructor(
    private authSvc: AuthService,
    private turnosSvc: TurnosService  
  ) { }

  ngOnInit(): void {
    this.authSvc.getCurrentUserData('paciente').subscribe(user => {
      this.paciente = user[0];  
      console.log(this.paciente);
    });

    this.authUser$ = this.authSvc.getCurrentUser();
  }

  turnoPedido(obj: any): void {
    this.turnosSvc.agregarTurno({
      ...obj,
      docIdPaciente: this.paciente.docId,
    });

    this.mostrarTurnoAlert = true;
    setTimeout(() => this.mostrarTurnoAlert = false, 2600);
  }
}
