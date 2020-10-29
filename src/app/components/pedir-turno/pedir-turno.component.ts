import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { Profesional } from '../../models/profesional';
import * as moment from 'moment';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {

  @Output() turnoDetallesEvent = new EventEmitter();
  profesionalSeleccionado: Profesional;
  profesionales: Profesional[];
  filtro: string = 'apellido';
  fechaTurno: string;
  horaTurno: string;
  valor: string = '';
  fechaActual: string = (new Date().toLocaleString().split(' ')[0]).split('/').join('-');
  errMsjModal: string;

  constructor(private profesionalSvc: ProfesionalService) {  }

  ngOnInit(): void {
    console.log(this.fechaActual);
    
    this.profesionalSvc.obtenerProfesionales().subscribe(profesionales => {
      this.profesionales = profesionales;
    });
  }

  cambiarFiltro(): void {
    if(this.filtro === 'dia')
      this.valor = 'lunes';
    else
      this.valor = '';
  }

  pedirTurno(profesional: Profesional): void {
    this.profesionalSeleccionado = profesional;
  }  

  turnoConfirmado(): void {
    const dias = {
      1: 'lunes',
      2: 'martes',
      3: 'miercoles',
      4: 'jueves',
      5: 'viernes',
      6: 'sabado',
      0: 'domingo'
    }; 
    console.log(this.fechaTurno, this.horaTurno);

    if(!this.fechaTurno || !this.horaTurno) {
      this.errMsjModal = 'No debe haber campos vacios';
      return;
    }

    const diaDeLaSemana = dias[moment(this.fechaTurno).weekday()];
    console.log('Dia de la semana => ', diaDeLaSemana);
    
    if(!this.profesionalSeleccionado.diasAtencion.includes(diaDeLaSemana)) {
      this.errMsjModal= 'El profesional no atiende los dias ' + diaDeLaSemana;
      return;
    }
    this.errMsjModal = '';
    this.turnoDetallesEvent.emit({
      docIdProfesional: this.profesionalSeleccionado.docId,
      fecha: this.fechaTurno,
      hora: this.horaTurno,
    });
    (document.querySelector('#closeBtn') as HTMLButtonElement).click();

  }
}
