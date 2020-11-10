import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../../models/profesional';

@Component({
  selector: 'app-filtro-profesionales',
  templateUrl: './filtro-profesionales.component.html',
  styleUrls: ['./filtro-profesionales.component.scss']
})
export class FiltroProfesionalesComponent implements OnInit {

  @Input() profesionales: Profesional[];
  @Output() profesionalesFiltrados = new EventEmitter<Profesional[]>();
  condicion: 'especialidad' | 'dia' | 'apellido' = 'apellido';
  especialidades: string[];
  
  constructor() { }

  ngOnInit(): void {
    this.setearEspecialidades();
  }

  cambiarFiltro(): void {
  }

  setearEspecialidades(): void {
    this.especialidades = [];

    this.profesionales.forEach(p => {
      p.especialidades.forEach(e => {
        if(!this.especialidades.includes(e)) {
          this.especialidades.push(e);
        }
      });
    });
  }

  filtrar(filtro: string): void {
    let profesionalFiltrado: Profesional[] = [];

    switch(this.condicion) {
      case 'apellido':
        profesionalFiltrado = this.profesionales.filter(p => p.apellido.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) > -1);
      break;

      case 'dia':
        profesionalFiltrado = this.profesionales.filter(p => p.diasAtencion.indexOf(filtro)  > -1);
      break;

      case 'especialidad':
        profesionalFiltrado = this.profesionales.filter(p => p.especialidades.includes(filtro));
      break;
    }
    
    this.profesionalesFiltrados.emit(profesionalFiltrado);
  }
}
