import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailPage } from './tag-detail.page';

describe('TagDetailPage', () => {
  let component: TagDetailPage;
  let fixture: ComponentFixture<TagDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
