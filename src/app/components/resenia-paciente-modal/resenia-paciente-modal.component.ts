import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ReseniaPaciente } from '../../models/reseniaPaciente';
import { Turno } from '../../models/turno';
import Swal from 'sweetalert2';
import { TurnosService } from '../../services/turnos.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resenia-paciente-modal',
  templateUrl: './resenia-paciente-modal.component.html',
  styleUrls: ['./resenia-paciente-modal.component.scss'],
  providers: [NgbRatingConfig]  
})
export class ReseniaPacienteModalComponent implements OnInit {

  @ViewChild('modal') modal;
  turno: Turno;
  profesionalPuntaje: number;
  instalacionesPuntaje: number;
  sugerenciaATerceros: string;
  feedBack: string;
  soloLectura: boolean = false;

  constructor(private modalSvc: NgbModal, private turnosSvc: TurnosService) { }

  ngOnInit(): void {
  }

  abrir(turno?: Turno,resenia?: ReseniaPaciente) {
    if(turno) {
      this.turno = turno;
    }

    if(resenia) {
      const {profesional, instalaciones, sugerirATerceros, feedBack} = resenia; 
      this.profesionalPuntaje = profesional;
      this.instalacionesPuntaje = instalaciones;
      this.sugerenciaATerceros = sugerirATerceros;
      this.feedBack = feedBack || '';
      this.soloLectura = true;
    }

    this.modalSvc.open(this.modal, {
      backdrop: 'static',
      keyboard: false
    }).result.catch(() => {
      this.profesionalPuntaje = null;
      this.instalacionesPuntaje = null;
      this.sugerenciaATerceros = null;
      this.feedBack = null;
      this.soloLectura = false;
    });
  }

  cerrar(): void {
    this.modalSvc.dismissAll();
  }

  guardarEncuesta(): void {

    if(!this.instalacionesPuntaje || !this.profesionalPuntaje || !this.sugerenciaATerceros) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe llenar los campos que son obligatorios',
        position: 'top'
      });

      return;
    }

    const resenia: ReseniaPaciente =  {
      profesional: this.profesionalPuntaje, 
      instalaciones: this.instalacionesPuntaje, 
      sugerirATerceros: this.sugerenciaATerceros, 
    }; 

    if(this.feedBack) {
      resenia.feedBack = this.feedBack;
    }

    this.turnosSvc.guardarReseniaPaciente(this.turno.docId, resenia)
    .then(() => {
      Swal.fire({
        toast: true,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: 'Se ha registrado la encuesta correctamente!',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    })
    .catch(() => {
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: 'Ocurrio un error al guardar la encuesta, intentelo de nuevo!',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    })
    .finally(() => {
      this.cerrar();
    });
  }

  generarPDF(): void {
    const data = document.getElementById('encuesta');  
    html2canvas(data).then(canvas => {  
      const imgWidth = 208;   
      const imgHeight = canvas.height * imgWidth / canvas.width;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); 
      const position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.setFontSize(20);
      pdf.save('resenia_paciente.pdf');
    });  
  }
}
