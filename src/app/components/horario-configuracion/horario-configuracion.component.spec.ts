import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioConfiguracionComponent } from './horario-configuracion.component';

describe('HorarioConfiguracionComponent', () => {
  let component: HorarioConfiguracionComponent;
  let fixture: ComponentFixture<HorarioConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioConfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
