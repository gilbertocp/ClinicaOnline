import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Profesional } from '../../models/profesional';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno';
import * as moment from 'moment';
import { TurnoEstado } from 'src/app/models/turno-estado.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit, OnChanges, OnDestroy {

  @Input() profesional: Profesional;
  @Input() fechaSeleccionada: moment.Moment;
  @Output() horaSeleccionado = new EventEmitter<moment.Moment>();
  horaSeleccionadaBtn: HTMLButtonElement;
  turnos: Turno[];
  horas: moment.Moment[];
  turnosSubscription: Subscription;

  constructor(private turnosSvc: TurnosService) { }

  ngOnDestroy(): void {
    this.turnosSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.turnosSubscription = this.turnosSvc.turnosProfesional(this.profesional.docId).subscribe(turnos => {
      this.turnos = turnos;
      this.mostrarHorasDisponibles();

      this.turnosSubscription.unsubscribe();
    });  
  }

  ngOnInit(): void {
  }

  mostrarHorasDisponibles(): void {
    this.horas = [];

    const horaInicio = parseInt(this.profesional.horarioInicio.split(':')[0]);
    const minutoInicio = parseInt(this.profesional.horarioInicio.split(':')[1]);

    const horaSalida = parseInt(this.profesional.horarioSalida.split(':')[0]);
    const minutoSalida = parseInt(this.profesional.horarioSalida.split(':')[1]);

    const hI = moment({hours: horaInicio, minutes: minutoInicio, seconds:0});
    const hS = moment({hours: horaSalida, minutes: minutoSalida, seconds:0});
    
    for(const i = hI; hI < hS; i.add(30, 'minutes')) {
      const aux = moment(i);
      this.horas.push(aux);
    }
    this.horas = this.horas.filter(hora => !this.estaReservado(hora));

    this.horas.forEach(h => console.log(h.format('HH:mm:ss')));
  }

  estaReservado(hora: moment.Moment): boolean {
    return this.turnos.some(turno => {
      if (turno.estado === TurnoEstado.enEspera || turno.estado === TurnoEstado.confirmado) {
        return hora.format('HH:mm') === turno.hora && turno.fecha === this.fechaSeleccionada.format('DD/MM/YYYY');
      }
      return false;
    });
  }

  seleccionarHora({currentTarget}, hora: moment.Moment): void {
    if (this.horaSeleccionadaBtn) {
      this.horaSeleccionadaBtn.removeAttribute('disabled');
      this.horaSeleccionadaBtn.innerHTML = 'Seleccionar';
    }

    this.horaSeleccionadaBtn = currentTarget;
    currentTarget.setAttribute('disabled', 'disabled');
    currentTarget.innerHTML = 'Seleccionado';

    this.horaSeleccionado.emit(hora);
  }
}
