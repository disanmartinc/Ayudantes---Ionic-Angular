import { TestBed } from '@angular/core/testing';

import { RegistrartrabajoService } from './registrartrabajo.service';

describe('RegistrartrabajoService', () => {
  let service: RegistrartrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrartrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
