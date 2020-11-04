import { TurnoEstado } from './turno-estado.enum';

export interface Turno {
  docId?: string,
  docIdProfesional: string,
  docIdPaciente: string,
  fecha: string,
  hora: string,
  estado: TurnoEstado,
  motivoRechazo?: string,
  reseniaProfesional?: string,
  reseniaPaciente?: string
}
