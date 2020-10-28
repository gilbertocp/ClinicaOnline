import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private db: AngularFirestore) { }

  getSolicitud(docId: string): Observable<Solicitud[]> {
    return this.db.collection<Solicitud>('solicitudes_profesionales', ref => ref.where('profesionalDocId', '==', docId)).valueChanges();
  }

  getSolicitudes(): Observable<Solicitud[]> {
    return this.db.collection<Solicitud>('solicitudes_profesionales').valueChanges({idField: 'docId'});
  }

}
