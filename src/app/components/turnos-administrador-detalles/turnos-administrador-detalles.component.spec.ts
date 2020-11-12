import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAdministradorDetallesComponent } from './turnos-administrador-detalles.component';

describe('TurnosAdministradorDetallesComponent', () => {
  let component: TurnosAdministradorDetallesComponent;
  let fixture: ComponentFixture<TurnosAdministradorDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosAdministradorDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAdministradorDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
