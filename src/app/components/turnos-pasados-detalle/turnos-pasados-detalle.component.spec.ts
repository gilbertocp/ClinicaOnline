import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPasadosDetalleComponent } from './turnos-pasados-detalle.component';

describe('TurnosPasadosDetalleComponent', () => {
  let component: TurnosPasadosDetalleComponent;
  let fixture: ComponentFixture<TurnosPasadosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPasadosDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPasadosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
