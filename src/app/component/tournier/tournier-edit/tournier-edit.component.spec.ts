/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TournierEditComponent } from './tournier-edit.component';

describe('TournierEditComponent', () => {
  let component: TournierEditComponent;
  let fixture: ComponentFixture<TournierEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournierEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
