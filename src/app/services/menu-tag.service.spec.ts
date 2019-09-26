import { TestBed } from '@angular/core/testing';

import { MenuTagService } from './menu-tag.service';

describe('MenuTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuTagService = TestBed.get(MenuTagService);
    expect(service).toBeTruthy();
  });
});
