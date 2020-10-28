import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from 'src/app/models/profesional';
import { Solicitud } from 'src/app/models/solicitud';
import { AuthService } from 'src/app/services/auth.service';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {

  profesional: Profesional;
  modalBtn: HTMLButtonElement;
  solicitudAprobacion$: Observable<Solicitud[]>;
  
  constructor(
    private authSvc: AuthService,
    private profesionalSvc: ProfesionalService,
    private solicitudesSvc: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.authSvc.getCurrentUserData('profesional').subscribe(profesional => {
      this.profesional = profesional[0];
      console.log(this.profesional);
      
      if(!this.profesional.habilitado) {
        if(!this.modalBtn) {
          this.modalBtn = document.querySelector('#modal-launcher') as HTMLButtonElement;
          this.modalBtn.click();
        }
      } else {
        if(this.modalBtn) {
          this.modalBtn.click();
          this.modalBtn = null;
        }
      }

      this.solicitudAprobacion$ = this.solicitudesSvc.getSolicitud(this.profesional.docId);
    });
  }

  enviarSolicitud(): void {
    const {correo, docId} = this.profesional;
    this.profesionalSvc.enviarSolicitudAprobacion(docId, correo);
  }
} 