import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';
import { ReseniaPaciente } from '../../models/reseniaPaciente';
import { ReseniaPacienteModalComponent } from '../resenia-paciente-modal/resenia-paciente-modal.component';
import { ReseniaProfesionalModalComponent } from '../resenia-profesional-modal/resenia-profesional-modal.component';
import { ReseniaProfesional } from '../../models/reseniaProfesional';

@Component({
  selector: 'app-turnos-profesional-detalles',
  templateUrl: './turnos-profesional-detalles.component.html',
  styleUrls: ['./turnos-profesional-detalles.component.scss']
})
export class TurnosProfesionalDetallesComponent implements OnInit {

  @ViewChild('reseniaPacienteModal') reseniaPacienteModal: ReseniaPacienteModalComponent;
  @ViewChild('reseniaProfesionalModal') reseniaProfesionalModal: ReseniaProfesionalModalComponent;
  @Input() profesional: Profesional;
  turnos: Turno[];

  constructor(
    private turnosSvc: TurnosService
  ) { }

  ngOnInit(): void {
    this.turnosSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
      console.log(turnos);
      
    });
  }

  aceptarTurno(docId: string): void {
    this.turnosSvc.confirmarTurno(docId);
  }

  cancelarTurno(docId: string): void {
    Swal.fire({
      title: 'Motivo del rechazo?',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Este campo es obligatorio!';
        }
        this.turnosSvc.cancelarTurnoProfesional(docId, value);
      }
    });
  }

  dejarResenia(turno: Turno): void {
    this.reseniaProfesionalModal.abrir(turno);
  }

  verReseniaPaciente(resenia: ReseniaPaciente): void {
    this.reseniaPacienteModal.abrir(null, resenia);
  }

  verReseniaProfesionalCompletada(resenia: ReseniaProfesional): void {
    this.reseniaProfesionalModal.abrir(null, resenia);
  }

  atender(docId: string): void {
    this.turnosSvc.atenderTurno(docId);    
  }
}
