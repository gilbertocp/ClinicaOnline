import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../models/paciente';
import Swal from 'sweetalert2';

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

  mostrarReseniaProfesional(resenia: string): void {
    Swal.fire({
      title: 'Reseña del profesional',
      text: resenia,
      icon: 'info',
      backdrop: true,
      timer: 2000
    })
  }
}
