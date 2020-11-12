import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-turno',
  templateUrl: './busqueda-turno.component.html',
  styleUrls: ['./busqueda-turno.component.scss']
})
export class BusquedaTurnoComponent implements OnInit {

  condicion: string = 'todos';

  constructor() { }

  ngOnInit(): void {
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

      case 'fecha':
        placeholder = 'Ingrese fecha del turno';
      break;
    }

    return placeholder;
  }

  cambiarFiltro(): void {

  }
}
