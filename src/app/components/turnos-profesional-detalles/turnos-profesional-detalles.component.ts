import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos-profesional-detalles',
  templateUrl: './turnos-profesional-detalles.component.html',
  styleUrls: ['./turnos-profesional-detalles.component.scss']
})
export class TurnosProfesionalDetallesComponent implements OnInit {

  @Input() profesional: Profesional;
  turnos: Turno[];

  constructor(
    private turnosSvc: TurnosService
  ) { }

  ngOnInit(): void {
    this.turnosSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
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
          return 'Este campo es obligatorio!'
        }
        this.turnosSvc.cancelarTurnoProfesional(docId, value);
      }
    });
  }
}
