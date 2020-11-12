import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';
import { TurnoEstado } from 'src/app/models/turno-estado.enum';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ReseniaProfesional } from '../models/reseniaProfesional';
import { ReseniaPaciente } from '../models/reseniaPaciente';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private db: AngularFirestore) { }

  // Traer todos los turnos
  get turnos(): Observable<Turno[]> {
    return this.db.collection<Turno>('turnos').valueChanges();
  }

  // Agrega a la colección de turnos un turno nuevo
  agregarTurno(turno: Turno): Promise<DocumentReference> {
    return this.db.collection<Turno>('turnos').add(turno);
  }

  // Consulta por los turnos vigentes de un determinado paciente
  turnosPaciente(docId: string): Observable<Turno[]> {
    return this.db
    .collection<Turno>(
      'turnos',
      ref => ref
      .where('docIdPaciente', '==', docId)
      .where('estado', 'in', [TurnoEstado.enEspera, TurnoEstado.confirmado])
    )
    .valueChanges({idField: 'docId'})
    .pipe(map(turnos => turnos.map(turno => this.verificarTurnoFinalizado(turno))));
  }

  // Consulta por los turnos en donde se ve involucrado un determinado profesional
  turnosProfesional(docId: string): Observable<Turno[]> {
    return this.db.collection<Turno>('turnos',
    ref => ref.where('docIdProfesional', '==', docId).orderBy('fecha', 'desc'))
    .valueChanges({idField: 'docId'})
    .pipe(map(turnos => turnos.map(turno => this.verificarTurnoFinalizado(turno))));
  }

  // Consulta por los turnos "pasados" (Cancelado por el paciente, Cancelado por el profesional o Finalizado)
  turnosPacientesPasados(docId: string): Observable<Turno[]> {
    return this.db
    .collection<Turno>('turnos',
    ref => ref.where('docIdPaciente', '==', docId)
    .where('estado', 'in', [TurnoEstado.canceladoPaciente, TurnoEstado.finalizado, TurnoEstado.rechazadoProfesional]))
    .valueChanges({idField: 'docId'});
  }

  // Cuando el profesional aceptar el turno
  confirmarTurno(docId: string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.confirmado}, {merge: true});
  }

  // Cuando el profesional rechaza el turno
  cancelarTurnoProfesional(docId: string, resenia: string): void {
    this.db.collection<Turno>('turnos').doc(docId)
    .set({motivoRechazo: resenia, estado: TurnoEstado.rechazadoProfesional},
    {merge: true});
  }

  // Cuando el paciente cancela su turno
  cancelarTurnoPaciente(docId: string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.canceladoPaciente}, {merge: true});
  }

  guardarReseniaProfesional(docId: string, resenia: ReseniaProfesional): Promise<void> {
    return this.db.collection<Turno>('turnos').doc(docId).set({reseniaProfesional: resenia}, {merge: true});
  }

  guardarReseniaPaciente(docId: string, resenia: ReseniaPaciente): Promise<void> {
    return this.db.collection<Turno>('turnos').doc(docId).set({reseniaPaciente: resenia}, {merge: true});
  }

  atenderTurno(docId:string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.finalizado}, {merge: true});
  }

  // Finaliza un turno 
  private finDelTurno(docId: string): void {
    this.db.collection<Turno>('turnos').doc(docId).set({estado: TurnoEstado.finalizado}, {merge: true});
  }

  private verificarTurnoFinalizado(turno: Turno): Turno {
    const {fecha, hora, docId, estado} = turno;
    const dia = parseInt(fecha.split('/')[0]);
    const mes = parseInt(fecha.split('/')[1]);
    const anio = parseInt(fecha.split('/')[2]);

    const _hora = parseInt(hora.split(':')[0]);
    const minutos = parseInt(hora.split(':')[1]);
    
    const fechaMoment: moment.Moment = moment({
      day: dia,
      month: mes-1,
      year: anio,
      hours: _hora,
      minutes: minutos,
      seconds: 0         
    });

    if(TurnoEstado.confirmado === estado){
      if(moment() > fechaMoment.add(30, 'minutes')) {
        this.finDelTurno(docId);
      }
    }

    return turno;
  }
}
