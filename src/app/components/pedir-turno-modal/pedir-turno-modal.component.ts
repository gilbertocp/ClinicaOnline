import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesional } from '../../models/profesional';
import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-pedir-turno-modal',
  templateUrl: './pedir-turno-modal.component.html',
  styleUrls: ['./pedir-turno-modal.component.scss']
})
export class PedirTurnoModalComponent implements OnInit {

  @ViewChild('modal') modal;
  @Output() fechaHoraProfesionalSeleccionados = new EventEmitter();
  profesional: Profesional;
  fechaSeleccionada: moment.Moment;
  horaSeleccionada:  moment.Moment;

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void {
    
  }

  abrir(profesional) {
    this.profesional = profesional;

    this.modalSvc.open(this.modal, {
      backdrop: 'static',
      keyboard: false
    }).result.then(
      () => {
      },
      () => {
        this.fechaSeleccionada = null;
        this.horaSeleccionada = null;
        this.profesional = null;
      }
    );
  }

  cerrar(): void {
    this.modalSvc.dismissAll();
  }

  obtenerFecha(fecha: moment.Moment): void {
    this.fechaSeleccionada = fecha;    
  }

  obtenerHora(hora: moment.Moment): void {
    this.horaSeleccionada = hora;
  }

  pedirTurno(): void {
    this.fechaHoraProfesionalSeleccionados.emit({
      fecha: this.fechaSeleccionada.format('DD/MM/YYYY'),
      hora: this.horaSeleccionada.format('HH:mm'),
      docIdProfesional: this.profesional.docId
    });
    this.cerrar();
  }

}

