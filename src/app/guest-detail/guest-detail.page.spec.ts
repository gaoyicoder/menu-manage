import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDetailPage } from './guest-detail.page';

describe('GuestDetailPage', () => {
  let component: GuestDetailPage;
  let fixture: ComponentFixture<GuestDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
