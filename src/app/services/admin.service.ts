import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private db: AngularFirestore) { }

  enviarSolicitud(docId: string, email: string): void {
    this.db.collection('solicitudes_profesionales').add({
      profesionalDocId: docId,
      correo: email,
      fecha: new Date()
    });
  }

  getSolicitud(docId: string): Observable<Solicitud[]> {
    return this.db.collection<Solicitud>('solicitudes_profesionales', ref => ref.where('profesionalDocId', '==', docId)).valueChanges();
  }

  getSolicitudes(): Observable<Solicitud[]> {
    return this.db.collection<Solicitud>('solicitudes_profesionales').valueChanges({idField: 'docId'});
  }

  aprobarSolicitud(solicitud: Solicitud): void {
    this.db.collection('usuarios').doc(solicitud.profesionalDocId).set(
      { habilitado: true },
      { merge: true}
    );

    this.db.collection('solicitudes_profesionales').doc(solicitud.docId).delete();
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    this.db.collection('solicitudes_profesionales').doc(solicitud.docId).delete();
  }

  registrarAdministradorId(docId: string,admin: Usuario): void {
    this.db.collection('usuarios').doc(docId).set(admin);
  }
}
