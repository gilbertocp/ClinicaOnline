import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../../models/profesional';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno';
import * as moment from 'moment';
import { TurnoEstado } from 'src/app/models/turno-estado.enum';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  @Input() profesional: Profesional;
  @Output() horaSeleccionado = new EventEmitter<moment.Moment>();
  horaSeleccionadaBtn: HTMLButtonElement;
  turnos: Turno[];
  horas: moment.Moment[];

  constructor(private turnosSvc: TurnosService) { }
  
  ngOnInit(): void {
    this.turnosSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
      this.mostrarHorasDisponibles();
    });
  }
  
  mostrarHorasDisponibles(): void {
    this.horas = [];
    
    const horaInicio = parseInt(this.profesional.horarioInicio.split(':')[0]);
    const minutoInicio = parseInt(this.profesional.horarioInicio.split(':')[1]);

    const horaSalida = parseInt(this.profesional.horarioSalida.split(':')[0]);

    for(let i = horaInicio; i < horaSalida; i++) {
      this.horas.push(moment({hours: i, minutes: minutoInicio, seconds: 0}));
      this.horas.push(moment({hours: i, minutes: minutoInicio+30, seconds: 0}));
    }

    this.horas = this.horas.filter(hora => !this.estaReservado(hora));
  }

  estaReservado(hora: moment.Moment): boolean {
    const momentDateTimeStr = hora.get("hours") + hora.get("minutes") === 0 ? "00" : hora.get("minutes");
    console.log(momentDateTimeStr);
    
    return this.turnos.some(turno => {
      if(turno.estado === TurnoEstado.enEspera || turno.estado === TurnoEstado.confirmado) {
        return momentDateTimeStr === turno.hora;
      }

      return false;
    });
  }

  seleccionarHora({currentTarget}, hora: moment.Moment): void { 
    if(this.horaSeleccionadaBtn) {
      this.horaSeleccionadaBtn.removeAttribute('disabled');
      this.horaSeleccionadaBtn.innerHTML = 'Seleccionar';
    }

    this.horaSeleccionadaBtn = currentTarget;
    currentTarget.setAttribute('disabled', 'disabled');
    currentTarget.innerHTML = 'Seleccionado';

    this.horaSeleccionado.emit(hora);
  }
}
