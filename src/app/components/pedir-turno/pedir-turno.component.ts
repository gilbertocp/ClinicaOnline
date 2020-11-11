import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { Profesional } from '../../models/profesional';
import { PedirTurnoModalComponent } from '../pedir-turno-modal/pedir-turno-modal.component';
import { TurnosService } from '../../services/turnos.service';
import { TurnoEstado } from '../../models/turno-estado.enum';
import { Paciente } from '../../models/paciente';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {

  @ViewChild('pedirTurnoModal') pedirTurnoModal: PedirTurnoModalComponent;
  @Input() paciente: Paciente;
  profesionales: Profesional[];
  profesionalesVista: Profesional[];

  constructor(
    private profesionalSvc: ProfesionalService,
    private turnosSvc: TurnosService
  ) {  }

  ngOnInit(): void {
    this.profesionalSvc.obtenerProfesionales().subscribe(profesionales => {
      this.profesionales = profesionales;
      this.profesionalesVista = profesionales;
    });
  }

  pedirTurno(profesional): void {
    this.pedirTurnoModal.abrir(profesional);
  }

  sacarTurno(obj: {fecha: string, hora: string, docIdProfesional: string, 
    nombreProfesional: string, apellidoProfesional: string}): void {

    const swalOptions: SweetAlertOptions = {
      title: 'Solicitud de turnos',
      confirmButtonText: 'Ok'
    };

    this.turnosSvc.agregarTurno({
      ...obj,
      estado: TurnoEstado.enEspera,
      docIdPaciente: this.paciente.docId,
      nombrePaciente: this.paciente.nombre,
      apellidoPaciente: this.paciente.apellido
    }).then(() => {
      swalOptions.icon = 'success';
      swalOptions.text = 'El turno ha sido solicitado!';
    })
    .catch(() => {
      swalOptions.icon = 'error';
      swalOptions.text = 'Ha ocurrido un error al solicitar el turno, intentelo de nuevo';
    })
    .finally(() => {
      Swal.fire(swalOptions);
    });

  }

  filtroProfesionales(pF: Profesional[]): void {
    this.profesionalesVista = pF;
  }
}
