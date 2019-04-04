import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetailPage } from './menu-detail.page';

describe('MenuDetailPage', () => {
  let component: MenuDetailPage;
  let fixture: ComponentFixture<MenuDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
