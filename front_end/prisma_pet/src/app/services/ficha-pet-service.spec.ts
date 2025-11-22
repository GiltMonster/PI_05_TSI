import { TestBed } from '@angular/core/testing';

import { FichaPetService } from './ficha-pet-service';

describe('FichaPetService', () => {
  let service: FichaPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
