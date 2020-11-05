import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../models/paciente';
import Swal from 'sweetalert2';
import { ReseniaProfesional } from '../../models/reseniaProfesional';
import { ReseniaPacienteModalComponent } from '../resenia-paciente-modal/resenia-paciente-modal.component';
import { ReseniaPaciente } from '../../models/reseniaPaciente';
import { ReseniaProfesionalModalComponent } from '../resenia-profesional-modal/resenia-profesional-modal.component';

@Component({
  selector: 'app-turnos-pasados-detalle',
  templateUrl: './turnos-pasados-detalle.component.html',
  styleUrls: ['./turnos-pasados-detalle.component.scss']
})
export class TurnosPasadosDetalleComponent implements OnInit {

  @ViewChild('reseniaPacienteModal') reseniaPacienteModal: ReseniaPacienteModalComponent;
  @ViewChild('reseniaProfesionalModal') reseniaProfesionalModal: ReseniaProfesionalModalComponent;
  @Input() paciente: Paciente;
  turnosPasados: Turno[];
  resenia: string;

  constructor(private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.turnosService.turnosPacientesPasados(this.paciente.docId).subscribe(turnos => {
      this.turnosPasados = turnos;
    });
  }

  mostrarMensajeRechazoProfesional(mensaje: string): void {
    Swal.fire({
      title: 'Reseña del profesional',
      text: mensaje,
      icon: 'info',
      backdrop: true,
      timer: 2000
    })
  }

  mostrarReseniaProfesional(resenia: ReseniaProfesional): void {
    this.reseniaProfesionalModal.abrir(null, resenia);
  }

  mostrarModalReseniaPaciente(turno: Turno): void {
    this.reseniaPacienteModal.abrir(turno);
  }

  mostrarModalReseniaPacienteCompletada(turno: Turno, resenia: ReseniaPaciente): void {
    this.reseniaPacienteModal.abrir(turno, resenia);
  }
}
