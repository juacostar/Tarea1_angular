import { TestBed } from '@angular/core/testing';

import { LoginUsuarioGuard } from './login-usuario.guard';

describe('LoginUsuarioGuard', () => {
  let guard: LoginUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
