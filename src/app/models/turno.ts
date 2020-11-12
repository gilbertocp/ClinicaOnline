import { TurnoEstado } from './turno-estado.enum';
import { ReseniaProfesional } from './reseniaProfesional';
import { ReseniaPaciente } from './reseniaPaciente';

export interface Turno {
  docId?: string;
  docIdProfesional: string;
  docIdPaciente: string;
  fecha: string;
  hora: string;
  estado: TurnoEstado;
  motivoRechazo?: string;
  reseniaProfesional?: ReseniaProfesional;
  reseniaPaciente?: ReseniaPaciente,
  nombreProfesional: string,
  apellidoProfesional: string,
  nombrePaciente: string,
  apellidoPaciente: string,
  especialidades: string[]
}
