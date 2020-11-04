export interface Profesional {
  nombre: string;
  apellido: string;
  docIdUsuario: string;
  especialidades: any;
  habilitado: boolean;
  correo?: string;
  docId?: string;
  puedeAtender: boolean;
  diasAtencion?: any;
  horarioInicio?: string;
  horarioSalida?: string;
}
