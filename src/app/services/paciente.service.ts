import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private db: AngularFirestore) { }

  guardarPaciente(paciente: Paciente): void {
    this.db.collection<Paciente>('pacientes').add(paciente);
  }

  obtenerPaciente(): Observable<Paciente[]> {
    return this.db.collection<Paciente>('pacientes').valueChanges({idField: 'docId'});
  }

  guardarTurnoPaciente(): void {
  }
}
