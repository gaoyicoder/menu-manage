import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPopPage } from './order-pop.page';

describe('OrderPopPage', () => {
  let component: OrderPopPage;
  let fixture: ComponentFixture<OrderPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
