import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Turno } from 'src/app/models/turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-grafico-operaciones-especialidad',
  templateUrl: './grafico-operaciones-especialidad.component.html',
  styleUrls: ['./grafico-operaciones-especialidad.component.scss']
})
export class GraficoOperacionesEspecialidadComponent implements OnInit {

  turnos: Turno[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [{
    backgroundColor: []
  }];

  constructor(private turnosSvc: TurnosService) { }

  ngOnInit(): void {
    this.turnosSvc.turnos.subscribe(turnos => {
      this.turnos = turnos;

      this.turnos.forEach(t => {
        t.especialidades.forEach(e => {
          if(!this.pieChartLabels.includes(e)) {
            this.pieChartLabels.push(e);
            this.pieChartColors[0].backgroundColor.push(this.generarColor());
          }
        });
      });

      this.pieChartLabels.forEach(l => {
        this.pieChartData.push(this.operacionesEspecialidad(l.toString()));
      });

    });
  }

  private operacionesEspecialidad(especialidad: string): number {
    return this.turnos.reduce((acc,el) => {
      
      if(el.especialidades.includes(especialidad)) {
        return ++acc;
      }

      return acc;
    },0);
  }

  private generarColor(): string {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }
}
