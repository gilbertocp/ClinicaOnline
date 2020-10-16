import { TestBed } from '@angular/core/testing';

import { CheckPacienteGuard } from './check-paciente.guard';

describe('CheckPacienteGuard', () => {
  let guard: CheckPacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckPacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
