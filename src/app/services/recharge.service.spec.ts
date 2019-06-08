import { TestBed } from '@angular/core/testing';

import { RechargeService } from './recharge.service';

describe('RechargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechargeService = TestBed.get(RechargeService);
    expect(service).toBeTruthy();
  });
});
