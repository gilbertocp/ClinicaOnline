import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label, SingleDataSet } from 'ng2-charts';
import { DIAS } from 'src/app/models/dias';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-grafico-turnos-dias-de-la-semana',
  templateUrl: './grafico-turnos-dias-de-la-semana.component.html',
  styleUrls: ['./grafico-turnos-dias-de-la-semana.component.scss']
})
export class GraficoTurnosDiasDeLaSemanaComponent implements OnInit {

  turnos: Turno[];

  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public polarAreaChartColors: Array<any> = [
    {
      backgroundColor: [
        '#2e67bf',
        '#7f8fa4'
      ],
    }
  ];

  constructor(private turnosSvc: TurnosService) { }

  ngOnInit(): void {
    this.turnosSvc.turnos.subscribe(turnos => {
      this.turnos = turnos;
      
      for(let i = 1; i <= 7; i++) {
        this.polarAreaChartLabels.push(DIAS[i]);
      }

      this.polarAreaChartLabels.forEach(l => {
        this.polarAreaChartData.push(this.cantidadTurnosDeterminadoDia(l.toString()));
      });
    });    
  }

  private cantidadTurnosDeterminadoDia(dia: string) {
    return this.turnos.map(t => {
      const {fecha, hora} = t;
      const dia = parseInt(fecha.split('/')[0]);
      const mes = parseInt(fecha.split('/')[1]);
      const anio = parseInt(fecha.split('/')[2]);
  
      const _hora = parseInt(hora.split(':')[0]);
      const minutos = parseInt(hora.split(':')[1]);
      
      return moment({
        days: dia,
        months: mes-1,
        years: anio,
        hours: _hora,
        minutes: minutos,
        seconds: 0         
      });
    })
    .reduce((acc, el) => {
      if(dia === DIAS[el.isoWeekday()]) {
        return ++acc;
      }

      return acc;
    },0);
  }
}
