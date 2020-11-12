import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/models/turno';

@Component({
  selector: 'app-busqueda-turno',
  templateUrl: './busqueda-turno.component.html',
  styleUrls: ['./busqueda-turno.component.scss']
})
export class BusquedaTurnoComponent implements OnInit {

  @Input() turnos: Turno[];
  @Output() turnosFiltrados = new EventEmitter<Turno[]>();
  condicion: string = 'todos';
  especialidades: string[];

  constructor() { }

  ngOnInit(): void {
    this.setearEspecialidades();
  }

  get textoPlaceholder(): string {
    let placeholder = '';

    switch(this.condicion) {
      case 'todos':
        placeholder = 'Mostrando todos los turnos existentes';
      break;

      case 'paciente':
        placeholder = 'Ingrese nombre o apellido del paciente';
      break;

      case 'medico':
        placeholder = 'Ingrese nombre o apellido del médico';
      break;

      case 'especialidad':
        placeholder = 'Ingrese especialidad del médico';
      break;

      case 'fecha':
        placeholder = 'DD/MM/YYYY';
      break;
    }

    return placeholder;
  }

  filtroCambiado(): void {
    if(this.condicion === 'todos') {
      this.filtrar('todos');
    }
  }

  setearEspecialidades(): void {
    this.especialidades = [];

    this.turnos.forEach(t => {
      t.especialidades.forEach(e => {
        if(!this.especialidades.includes(e)) {
          this.especialidades.push(e);
        }
      });
    });
  }

  filtrar(filtro: string): void {
    let turnosFiltrados: Turno[] = [];

    switch(this.condicion) {
      case 'todos':
        turnosFiltrados = this.turnos;
      break;

      case 'paciente':
        turnosFiltrados = this.turnos.filter(t => {
          return t.apellidoPaciente.toLowerCase().indexOf(filtro.toLowerCase()) > -1 ||
                t.nombrePaciente.toLowerCase().indexOf(filtro.toLowerCase()) > -1;
        });
      break;

      case 'medico':
        turnosFiltrados = this.turnos.filter(t => {
          return t.nombreProfesional.toLowerCase().indexOf(filtro.toLowerCase()) > -1 ||
                t.apellidoProfesional.toLowerCase().indexOf(filtro.toLowerCase()) > -1;
        });
      break;

      case 'especialidad':
        turnosFiltrados = this.turnos.filter(p => p.especialidades.includes(filtro));
      break;

      case 'fecha':
        turnosFiltrados = this.turnos.filter(t => {
          return t.fecha.indexOf(filtro) > -1
        });
      break;
    }  
  
    this.turnosFiltrados.emit(turnosFiltrados);
  }
}
