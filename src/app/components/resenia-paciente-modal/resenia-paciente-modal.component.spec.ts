import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaPacienteModalComponent } from './resenia-paciente-modal.component';

describe('ReseniaPacienteModalComponent', () => {
  let component: ReseniaPacienteModalComponent;
  let fixture: ComponentFixture<ReseniaPacienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaPacienteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaPacienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
