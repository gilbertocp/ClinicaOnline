import { TestBed } from '@angular/core/testing';

import { CheckProfesionalGuard } from './check-profesional.guard';

describe('CheckProfesionalGuard', () => {
  let guard: CheckProfesionalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckProfesionalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
