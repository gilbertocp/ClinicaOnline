import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPacienteDetallesComponent } from './turnos-paciente-detalles.component';

describe('TurnosPacienteDetallesComponent', () => {
  let component: TurnosPacienteDetallesComponent;
  let fixture: ComponentFixture<TurnosPacienteDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPacienteDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPacienteDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
