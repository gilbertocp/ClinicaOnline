import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReseniaProfesional } from 'src/app/models/reseniaProfesional';
import Swal from 'sweetalert2';
import { Turno } from '../../models/turno';
import { TurnosService } from '../../services/turnos.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resenia-profesional-modal',
  templateUrl: './resenia-profesional-modal.component.html',
  styleUrls: ['./resenia-profesional-modal.component.scss']
})
export class ReseniaProfesionalModalComponent implements OnInit {

  @ViewChild('modal') modal;
  turno: Turno;
  soloLectura: boolean = false;
  camposOpcionales: number = 0;

  edad: string;
  temperatura:string;
  presion: string;
  otrasObservaciones: string[] = [];

  constructor(private modalSvc: NgbModal, private turnosSvc: TurnosService) { }

  ngOnInit(): void {
  }

  abrir(turno: Turno, resenia?: ReseniaProfesional): void {
    this.turno = turno ?? null;

    if(resenia) {
      const {edad,temperaturaCorporal,presion, otrasObservaciones} = resenia;
      this.edad = edad;
      this.temperatura = temperaturaCorporal;
      this.presion = presion;
      this.otrasObservaciones = otrasObservaciones || [];
      this.soloLectura = true;
    }

    this.modalSvc.open(this.modal, {
      backdrop: 'static',
      keyboard: false
    }).result.catch(() => {
      this.otrasObservaciones = [];
      this.edad = null; 
      this.presion = null; 
      this.temperatura = null;
      this.soloLectura = false;
    });
  }

  cerrar(): void {
    this.modalSvc.dismissAll();
  }

  agregarInput(formulario: HTMLFormElement): void {
    if(this.camposOpcionales < 3) {
      const nro = ++this.camposOpcionales;
      const txt = document.createElement('input');
      txt.type = 'text';
      txt.id = 'obs' + nro;
      txt.classList.add('form-control', 'rounded-pill', 'mt-3');
      txt.placeholder = 'Ingrese una información adicional';
      formulario.appendChild(txt);
    }
  }

  eliminarInput(formulario: HTMLFormElement): void {
    if(this.camposOpcionales > 0) {
      const lastChild = formulario.lastChild;
      formulario.removeChild(lastChild);
      this.camposOpcionales--;
    }
  }

  guardarResenia(): void {
    if(!this.edad || !this.presion || !this.temperatura) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe llenar los campos que son obligatorios (Edad, Presion, Temperatura)',
        position: 'top'
      });
      return;
    }

    const resenia: ReseniaProfesional = {
      edad: this.edad,
      temperaturaCorporal: this.temperatura,
      presion: this.presion
    }
    
    if(this.camposOpcionales > 0) {
      for(let i = 0; i < this.camposOpcionales; i++) {
        this.otrasObservaciones.push((document.querySelector(`#obs${i+1}`) as HTMLInputElement).value);
      }
    }

    resenia.otrasObservaciones = this.otrasObservaciones;

    this.turnosSvc.guardarReseniaProfesional(this.turno.docId,resenia)
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
      this.cerrar()
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
      pdf.save('resenia_profesional.pdf');
    });  
  }
}
