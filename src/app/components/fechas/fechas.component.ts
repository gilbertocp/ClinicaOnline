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
  configuracionCalendario: IDatePickerConfig = {
    format: 'DD-MM-YYYY',
    locale: moment.locale('es'),
    showNearMonthDays: false,
    isDayDisabledCallback: (date) => {
      return  !this.profesional.diasAtencion.includes(DIAS[date.weekday()]) || 
              date.weekday() === 6 || 
              date < moment({hour: 0, minute: 0, second: 0, millisecond: 0}) || 
              date > moment({hour: 0, minute: 0, second: 0, millisecond: 0}).add(15, 'days')
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  seleccionado(fecha: moment.Moment) {
    this.fechaSeleccionada.emit(fecha);
  }
}
