import { TestBed } from '@angular/core/testing';

import { GetStockDataService } from './get-stock-data.service';

describe('GetStockDataService', () => {
  let service: GetStockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
