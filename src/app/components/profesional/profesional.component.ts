import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
export class ProfesionalComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  profesional: Profesional;
  modalBtn: HTMLButtonElement;
  solicitudAprobacion$: Observable<Solicitud[]>;

  constructor(
    private authSvc: AuthService,
    private profesionalSvc: ProfesionalService,
    private solicitudesSvc: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
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
            this.modalBtn = null;
            (document.querySelector('#closeBtn') as HTMLButtonElement).click()
          }
        }

        this.solicitudAprobacion$ = this.solicitudesSvc.getSolicitud(this.profesional.docId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  enviarSolicitud(): void {
    const {correo, docId} = this.profesional;
    this.profesionalSvc.enviarSolicitudAprobacion(docId, correo);
  }
} 