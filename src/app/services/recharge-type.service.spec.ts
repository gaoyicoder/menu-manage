import { TestBed } from '@angular/core/testing';

import { RechargeTypeService } from './recharge-type.service';

describe('RechargeTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechargeTypeService = TestBed.get(RechargeTypeService);
    expect(service).toBeTruthy();
  });
});
