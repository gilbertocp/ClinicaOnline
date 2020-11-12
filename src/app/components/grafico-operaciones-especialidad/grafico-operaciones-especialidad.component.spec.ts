import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOperacionesEspecialidadComponent } from './grafico-operaciones-especialidad.component';

describe('GraficoOperacionesEspecialidadComponent', () => {
  let component: GraficoOperacionesEspecialidadComponent;
  let fixture: ComponentFixture<GraficoOperacionesEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoOperacionesEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoOperacionesEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
