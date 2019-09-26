import { TestBed } from '@angular/core/testing';

import { DiscountTypeService } from './discount-type.service';

describe('DiscountTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountTypeService = TestBed.get(DiscountTypeService);
    expect(service).toBeTruthy();
  });
});
