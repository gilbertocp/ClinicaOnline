import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Profesional } from '../models/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  constructor(private db: AngularFirestore) { }

  guardarProfesional(profesional: Profesional): void {
    this.db.collection<Profesional>('profesionales').add(profesional);
  }

  obtenerProfesionales(): Observable<Profesional[]> {
    return this.db.collection<Profesional>('profesionales').valueChanges({idField: 'docId'});
  }

  enviarSolicitudAprobacion(docId: string, email: string): void {
    this.db.collection('solicitudes_profesionales').add({
      profesionalDocId: docId,
      correo: email,
      fecha: new Date()
    });
  }
}
