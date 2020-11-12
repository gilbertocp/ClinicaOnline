import { Component, OnInit, ViewChild } from '@angular/core';
import { ReseniaPaciente } from 'src/app/models/reseniaPaciente';
import { ReseniaProfesional } from 'src/app/models/reseniaProfesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { ReseniaPacienteModalComponent } from '../resenia-paciente-modal/resenia-paciente-modal.component';
import { ReseniaProfesionalModalComponent } from '../resenia-profesional-modal/resenia-profesional-modal.component';

@Component({
  selector: 'app-turnos-administrador-detalles',
  templateUrl: './turnos-administrador-detalles.component.html',
  styleUrls: ['./turnos-administrador-detalles.component.scss']
})
export class TurnosAdministradorDetallesComponent implements OnInit {

  @ViewChild('reseniaPacienteModal') reseniaPacienteModal: ReseniaPacienteModalComponent;
  @ViewChild('reseniaProfesionalModal') reseniaProfesionalModal: ReseniaProfesionalModalComponent;
  turnos: Turno[];
  turnosVista: Turno[];

  constructor(private turnosSvc: TurnosService) { }

  ngOnInit(): void {
    this.turnosSvc.turnos.subscribe(turnos => {
      this.turnos = turnos;
      this.turnosVista = turnos;
    });
  }

  filtroTurnos(turnosFiltrado: Turno[]): void {
    this.turnosVista = turnosFiltrado;
  }

  verReseniaProfesionalCompletada(resenia: ReseniaProfesional): void {
    this.reseniaProfesionalModal.abrir(null, resenia);
  }

  verReseniaPacienteCompletada(resenia: ReseniaPaciente): void {
    this.reseniaPacienteModal.abrir(null, resenia);
  }
}
