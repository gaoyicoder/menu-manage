import { TestBed } from '@angular/core/testing';

import { MenuTypeService } from './menu-type.service';

describe('MenuTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuTypeService = TestBed.get(MenuTypeService);
    expect(service).toBeTruthy();
  });
});
