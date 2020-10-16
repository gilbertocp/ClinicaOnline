import { TestBed } from '@angular/core/testing';

import { CheckPerfilGuard } from './check-perfil.guard';

describe('CheckPerfilGuard', () => {
  let guard: CheckPerfilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckPerfilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
