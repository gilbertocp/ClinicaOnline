import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { TurnoEstado } from 'src/app/models/turno-estado.enum';

@Component({
  selector: 'app-turnos-profesional-detalles',
  templateUrl: './turnos-profesional-detalles.component.html',
  styleUrls: ['./turnos-profesional-detalles.component.scss']
})
export class TurnosProfesionalDetallesComponent implements OnInit {

  @Input() profesional: Profesional;
  reseniaProfesional: string;
  docIdTurnoSeleccionado: string;
  turnos: Turno[];

  constructor(
    private turnosSvc: TurnosService
  ) { }

  ngOnInit(): void {
    this.turnosSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
    });
  }

  turnoSeleccionado(docId: string): void {
    this.docIdTurnoSeleccionado = docId; 
  }

  aceptarTurno(docId: string): void {
    this.turnosSvc.confirmarTurno(docId);
  }

  cancelarTurno(): void {
    (document.querySelector('#closeBtn') as HTMLButtonElement).click();
    this.turnosSvc.cancelarTurnoProfesional(this.docIdTurnoSeleccionado, this.reseniaProfesional);
  }
}
