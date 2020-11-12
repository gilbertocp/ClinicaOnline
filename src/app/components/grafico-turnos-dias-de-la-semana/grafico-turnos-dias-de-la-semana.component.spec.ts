import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTurnosDiasDeLaSemanaComponent } from './grafico-turnos-dias-de-la-semana.component';

describe('GraficoTurnosDiasDeLaSemanaComponent', () => {
  let component: GraficoTurnosDiasDeLaSemanaComponent;
  let fixture: ComponentFixture<GraficoTurnosDiasDeLaSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoTurnosDiasDeLaSemanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTurnosDiasDeLaSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
