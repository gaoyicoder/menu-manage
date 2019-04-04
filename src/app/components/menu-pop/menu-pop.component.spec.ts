import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPopPage } from './menu-pop.page';

describe('MenuPopPage', () => {
  let component: MenuPopPage;
  let fixture: ComponentFixture<MenuPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
