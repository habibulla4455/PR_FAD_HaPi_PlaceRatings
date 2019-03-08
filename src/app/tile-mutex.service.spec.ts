import { TestBed } from '@angular/core/testing';

import { TileMutexService } from './tile-mutex.service';

describe('TileMutexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TileMutexService = TestBed.get(TileMutexService);
    expect(service).toBeTruthy();
  });
});
