import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';
import { TurnoEstado } from 'src/app/models/turno-estado.enum';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db: AngularFirestore) { }

  agregarTurno(turno: Turno): Promise<DocumentReference> {
    return this.db.collection<Turno>('turnos').add(turno);
  }

  turnosPaciente(docId: string): Observable<Turno[]> {
    return this.db
    .collection<Turno>('turnos',
    ref => ref.where('docIdPaciente', '==', docId).where('estado', 'in', [TurnoEstado.enEspera, TurnoEstado.confirmado]))
    .valueChanges({idField: 'docId'});
  }

  turnosProfesional(docId: string): Observable<Turno[]> {
    return this.db.collection<Turno>('turnos',
    ref => ref.where('docIdProfesional', '==', docId).orderBy('fecha', 'desc'))
    .valueChanges({idField: 'docId'});
    // return this.db.collection<Turno>('turnos', ref => ref.where('docIdProfesional', '==', docId)).valueChanges({idField: 'docId'});
  }

  turnosPacientesPasados(docId: string): Observable<Turno[]> {
    return this.db
    .collection<Turno>('turnos',
    ref => ref.where('docIdPaciente', '==', docId)
    .where('estado', 'in', [TurnoEstado.canceladoPaciente, TurnoEstado.finalizado, TurnoEstado.rechazadoProfesional]))
    .valueChanges({idField: 'docId'});
  }

  turnosConfirmadosPaciente(docId: string) {  }

  confirmarTurno(docId: string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.confirmado}, {merge: true});
  }

  cancelarTurnoProfesional(docId: string, resenia: string): void {
    this.db.collection<Turno>('turnos').doc(docId)
    .set({reseniaProfesional: resenia, estado: TurnoEstado.rechazadoProfesional},
    {merge: true});
  }

  cancelarTurnoPaciente(docId: string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.canceladoPaciente}, {merge: true});
  }
}
