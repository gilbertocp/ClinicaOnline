import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno';

@Component({
  selector: 'app-turnos-pasados-detalle',
  templateUrl: './turnos-pasados-detalle.component.html',
  styleUrls: ['./turnos-pasados-detalle.component.scss']
})
export class TurnosPasadosDetalleComponent implements OnInit {

  turnosPasados: Turno[];

  constructor() { }

  ngOnInit(): void {
  }

}
