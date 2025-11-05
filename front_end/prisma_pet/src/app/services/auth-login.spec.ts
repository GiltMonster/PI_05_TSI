import { TestBed } from '@angular/core/testing';

import { AuthLogin } from './auth-login';

describe('AuthLogin', () => {
  let service: AuthLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
