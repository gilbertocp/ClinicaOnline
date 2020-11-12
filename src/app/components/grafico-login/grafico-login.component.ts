import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grafico-login',
  templateUrl: './grafico-login.component.html',
  styleUrls: ['./grafico-login.component.scss']
})
export class GraficoLoginComponent implements OnInit {

  loginProfesionalesData: moment.Moment[] = [];


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [];
  // data label

  constructor(private db: AngularFirestore) { }
  
  get loginProfesionales(): Observable<any> {
    return this.db.collection('loginProfesionales').valueChanges();
  }

  ngOnInit(): void {
    this.loginProfesionales.subscribe(data => {
      this.loginProfesionalesData = [];
      this.loginProfesionalesData = data
                                      .map(fh => moment(fh.fechaYHora.toDate()))
                                      .sort((f1,f2) => f1 - f2);

      const currentDate = moment();
      const weekStart = currentDate.clone().startOf('week');
      // const weekEnd = currentDate.clone().endOf('week');
      const semana = [];

      for (let i = 0; i <= 6; i++) {
        const dia = moment(weekStart).add(i, 'days');
        if(!this.barChartLabels.includes(dia.format('DD/MM/YYYY'))) {
          this.barChartLabels.push(dia.format('DD/MM/YYYY'));
        }
        semana.push(dia);
      }

      this.barChartData[0].label = 'Ingresos al sistema de profesionales en la semana';

      this.barChartLabels.forEach((label) => {
        this.barChartData[0].data.push(this.vecesLogueados(label.toString()));
      });

    });
  }

  private vecesLogueados(fecha: string): number {
    return this.loginProfesionalesData
    .filter(fh => fh.format('DD/MM/YYYY') === fecha)
    .reduce((acc,el) => ++acc,0);
  }
}
