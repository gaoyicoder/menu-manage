import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPopPage } from './guest-pop.page';

describe('GuestPopPage', () => {
  let component: GuestPopPage;
  let fixture: ComponentFixture<GuestPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
