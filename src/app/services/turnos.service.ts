import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db: AngularFirestore) { }

  agregarTurno(turno: Turno): void {
    this.db.collection<Turno>('turnos').add(turno);
  }

  turnosPaciente(docId: string): Observable<Turno[]> {
    return this.db.collection<Turno>('turnos', ref => ref.where('docIdPaciente', '==', docId)).valueChanges({idField: 'docId'});
  }

  turnosProfesional(docId: string): Observable<Turno[]> {
    return this.db.collection<Turno>('turnos', ref => ref.where('docIdProfesional', '==', docId)).valueChanges({idField: 'docId'});
  }
}
