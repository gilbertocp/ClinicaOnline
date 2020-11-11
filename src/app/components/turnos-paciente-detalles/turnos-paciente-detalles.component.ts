import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-paciente-detalles',
  templateUrl: './turnos-paciente-detalles.component.html',
  styleUrls: ['./turnos-paciente-detalles.component.scss']
})
export class TurnosPacienteDetallesComponent implements OnInit {

  @Input() paciente: Paciente;
  turnos: Turno[];

  constructor(
    private turnosSvc: TurnosService,
    public profesionalSvc: ProfesionalService  
  ) { }

  ngOnInit(): void {
    this.turnosSvc.turnosPaciente(this.paciente.docId).subscribe(turnos => {
      this.turnos = turnos;
    });
  }

  cancelarTurno(docId: string): void {
    this.turnosSvc.cancelarTurnoPaciente(docId);
  }
}
