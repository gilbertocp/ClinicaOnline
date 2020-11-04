import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-profesionales',
  templateUrl: './filtro-profesionales.component.html',
  styleUrls: ['./filtro-profesionales.component.scss']
})
export class FiltroProfesionalesComponent implements OnInit {

  filtro: 'especialidad' | 'dia' | 'apellido';
  valor: string;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarFiltro(): void {

  }
}
