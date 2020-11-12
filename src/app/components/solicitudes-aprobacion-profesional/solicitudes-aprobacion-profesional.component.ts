import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Solicitud } from 'src/app/models/solicitud';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-solicitudes-aprobacion-profesional',
  templateUrl: './solicitudes-aprobacion-profesional.component.html',
  styleUrls: ['./solicitudes-aprobacion-profesional.component.scss']
})
export class SolicitudesAprobacionProfesionalComponent implements OnInit, OnDestroy {

  solicitudes = [];
  subscription: Subscription;

  constructor(private adminSvc: AdminService) { }
  

  ngOnInit(): void {
    this.subscription = this.adminSvc.getSolicitudes().subscribe(solicitudes => {
      this.solicitudes = solicitudes;
      console.log(solicitudes);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aprobarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.aprobarSolicitud(solicitud);
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    this.adminSvc.rechazarSolicitud(solicitud);
  }
}
