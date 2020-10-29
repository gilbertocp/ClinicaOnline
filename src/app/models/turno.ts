export interface Turno {
  docIdProfesional: string,
  docIdPaciente: string,
  fecha: string,
  hora: string,
  confirmado?: boolean,
  motivoRechazo?: string,
  reseniaProfesional?: string,
  reseniaPaciente?: string
}
