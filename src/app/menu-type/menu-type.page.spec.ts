import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTypePage } from './menu-type.page';

describe('MenuTypePage', () => {
  let component: MenuTypePage;
  let fixture: ComponentFixture<MenuTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
