import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-profesional-detalles',
  templateUrl: './turnos-profesional-detalles.component.html',
  styleUrls: ['./turnos-profesional-detalles.component.scss']
})
export class TurnosProfesionalDetallesComponent implements OnInit {

  @Input() profesional: Profesional;
  turnos: Turno[];

  constructor(private profesionalSvc: TurnosService) { }

  ngOnInit(): void {
    this.profesionalSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
    });
  }

}
