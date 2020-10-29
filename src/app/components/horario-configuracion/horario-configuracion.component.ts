import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/models/profesional';
import { ProfesionalService } from 'src/app/services/profesional.service';
// import * as moment from 'moment';

@Component({
  selector: 'app-horario-configuracion',
  templateUrl: './horario-configuracion.component.html',
  styleUrls: ['./horario-configuracion.component.scss']
})
export class HorarioConfiguracionComponent implements OnInit {

  @Input() profesional: Profesional;

  constructor(private profesionalSvc: ProfesionalService) { }

  ngOnInit(): void {
    if(!this.profesional.puedeAtender) {
      return;
    }

    this.marcarHoras();
    this.marcarCheckBoxes();
  }

  marcarCheckBoxes(): void {
    if(this.profesional) {
      const checkBoxes = document.querySelectorAll('.form-check-input') as NodeListOf<HTMLInputElement>;
      checkBoxes.forEach(el => {
        if(this.profesional.diasAtencion.includes(el.value)) {
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
    const horaInicioStr:string = (document.querySelector('#horaInicio') as HTMLInputElement).value; 
    const horaSalidaStr: string =  (document.querySelector('#horaSalida') as HTMLInputElement).value;

    if(!horaInicioStr || !horaSalidaStr) {
      this.mostrarAlert('Los campos no deben estar vacios', 2500);
      return;
    }
    // let inicio = moment().add(horaInicioStr.split(':')[0], 'h');
    // inicio = moment().add(horaInicioStr.split(':')[0], 'm');

    // console.log(inicio);
    
    const dias = document.querySelectorAll('.form-check-input:checked') as NodeListOf<HTMLInputElement>;
    // this.generarHorario(horaInicioStr, horaSalidaStr);
    this.profesionalSvc.guardarHorario(profesional.docId, Array.from(dias).map(el => el.value), horaInicioStr, horaSalidaStr);
  }

  
  // generarHorario(horaInicio: string, horaSalida:string) {
  //   let hi = parseInt(horaInicio.split(':')[0]);
  //   let mi = parseInt(horaInicio.split(':')[1]);
  //   let hs = parseInt(horaSalida.split(':')[0]);
  //   let ms = parseInt(horaSalida.split(':')[1]);
  //   let hora = new Date()
  //   let horario = []; 
  //   for(let i = hi, y = mi; i < hs ; i++, y+=60) {
  //     horario.push(i + ':' + y);
  //     horario.push(i + ':' + y+30);
  //   }
  //   console.log(horario);
  // }

  mostrarAlert(errMsj: string, duracion: number = 1000): void {
    const alert = document.querySelector('#alert-form');
    document.querySelector('#alert-text').innerHTML = errMsj;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), duracion);
  }

} 
