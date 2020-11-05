import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Profesional } from '../models/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  constructor(private db: AngularFirestore) { }

  guardarProfesional(profesional: Profesional): Promise<DocumentReference> {
    return this.db.collection<Profesional>('profesionales').add(profesional);
  }

  obtenerProfesionales(): Observable<Profesional[]> {
    return this.db.collection<Profesional>('profesionales', ref => ref.where('puedeAtender', '==', true)).valueChanges({idField: 'docId'});
  }

  enviarSolicitudAprobacion(docId: string, email: string): void {
    this.db.collection('solicitudes_profesionales').add({
      profesionalDocId: docId,
      correo: email,
      fecha: new Date()
    });
  }

  guardarHorario(docId: string, dias: string[], horarioInicio: string, horarioSalida: string): void {
    this.db.collection<Profesional>('profesionales').doc(docId).set({
      horarioInicio, horarioSalida, diasAtencion: dias, puedeAtender: true
    }, {merge: true});
  }

}
