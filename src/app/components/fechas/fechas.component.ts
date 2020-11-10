import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { IDatePickerConfig } from 'ng2-date-picker';
import { DIAS } from '../../models/dias';
import { Profesional } from '../../models/profesional';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss']
})
export class FechasComponent implements OnInit {

  @Input() profesional: Profesional;
  @Output() fechaSeleccionada = new EventEmitter<moment.Moment>();
  fechas: moment.Moment[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generarFechasDisponibles();
  }

  seleccionado(fecha: moment.Moment): void {
    this.fechaSeleccionada.emit(fecha);
  }

  generarFechasDisponibles(): void {
    this.fechas = [];

    const fechaEnQuinceDias = moment({
      hour: 0, 
      minute: 0, 
      second: 0, 
      millisecond: 0
    }).add(15, 'days');

    for(let i = moment(); i <= fechaEnQuinceDias; i.add(1,'days')) {
      if(
        !(!this.profesional.diasAtencion.includes(DIAS[i.weekday()]) ||
        i.weekday() === 6 ||
        i <= moment({hour: 0, minute: 0, second: 0, millisecond: 0}) ||
        i > moment({hour: 0, minute: 0, second: 0, millisecond: 0}).add(15, 'days'))
      ) {
        const aux = moment(i);
        this.fechas.push(aux);
      }
    }
  }
}
