import { TestBed } from '@angular/core/testing';

import { GetProductDataService } from './get-product-data.service';

describe('GetProductDataService', () => {
  let service: GetProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
