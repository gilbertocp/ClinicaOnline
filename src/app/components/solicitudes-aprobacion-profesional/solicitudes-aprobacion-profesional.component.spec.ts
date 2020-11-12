import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAprobacionProfesionalComponent } from './solicitudes-aprobacion-profesional.component';

describe('SolicitudesAprobacionProfesionalComponent', () => {
  let component: SolicitudesAprobacionProfesionalComponent;
  let fixture: ComponentFixture<SolicitudesAprobacionProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAprobacionProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesAprobacionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
