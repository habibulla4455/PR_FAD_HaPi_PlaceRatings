import { TestBed } from '@angular/core/testing';

import { Dropdown.ServiceService } from './dropdown.service.service';

describe('Dropdown.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Dropdown.ServiceService = TestBed.get(Dropdown.ServiceService);
    expect(service).toBeTruthy();
  });
});
