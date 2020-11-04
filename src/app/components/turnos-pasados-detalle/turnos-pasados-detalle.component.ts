import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-turnos-pasados-detalle',
  templateUrl: './turnos-pasados-detalle.component.html',
  styleUrls: ['./turnos-pasados-detalle.component.scss']
})
export class TurnosPasadosDetalleComponent implements OnInit {

  @Input() paciente: Paciente;
  turnosPasados: Turno[];
  resenia: string;

  constructor(private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.turnosService.turnosPacientesPasados(this.paciente.docId).subscribe(turnos => {
      this.turnosPasados = turnos;
    });
  }

  setearResenia(resenia: string): void {
    this.resenia = resenia;
  }
}
