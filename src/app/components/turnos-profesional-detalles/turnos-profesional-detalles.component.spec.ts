import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosProfesionalDetallesComponent } from './turnos-profesional-detalles.component';

describe('TurnosProfesionalDetallesComponent', () => {
  let component: TurnosProfesionalDetallesComponent;
  let fixture: ComponentFixture<TurnosProfesionalDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosProfesionalDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosProfesionalDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
