import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTurno'
})
export class EstadoTurnoPipe implements PipeTransform {

  transform(value: number): string {
    const estados = {
      0: 'Confirmado',
      1: 'En espera',
      2: 'Rechazado por el profesional',
      3: 'Cancelado por el paciente',
      4: 'Finalizado',
    };

    return estados[value];
  }

}
