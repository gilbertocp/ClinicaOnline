import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { ProfesionalService } from 'src/app/services/profesional.service';

@Component({
  selector: 'app-horario-configuracion',
  templateUrl: './horario-configuracion.component.html',
  styleUrls: ['./horario-configuracion.component.scss']
})
export class HorarioConfiguracionComponent implements OnInit {

  @Input() profesional: Profesional;

  constructor(private profesionalSvc: ProfesionalService) { }

  ngOnInit(): void {
    if (!this.profesional.puedeAtender) {
      return;
    }

    this.marcarHoras();
    this.marcarCheckBoxes();
  }

  marcarCheckBoxes(): void {
    if (this.profesional) {
      const checkBoxes = document.querySelectorAll('.form-check-input') as NodeListOf<HTMLInputElement>;
      checkBoxes.forEach(el => {
        if (this.profesional.diasAtencion.includes(el.value)) {
          el.checked = true;
        }
      });
    }
  }

  marcarHoras(): void {
    (document.querySelector('#horaInicio') as HTMLInputElement).value = this.profesional.horarioInicio;
    (document.querySelector('#horaSalida') as HTMLInputElement).value = this.profesional.horarioSalida;
  }

  guardarHorario(profesional: Profesional): void {
    const horaInicioStr: string = (document.querySelector('#horaInicio') as HTMLInputElement).value;
    const horaSalidaStr: string =  (document.querySelector('#horaSalida') as HTMLInputElement).value;

    if (!horaInicioStr || !horaSalidaStr) {
      console.log('Los campos no deben estar vacios');
      return;
    }

    const dias = document.querySelectorAll('.form-check-input:checked') as NodeListOf<HTMLInputElement>;
    this.profesionalSvc.guardarHorario(profesional.docId, Array.from(dias).map(el => el.value), horaInicioStr, horaSalidaStr);
  }
  
}
