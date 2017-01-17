/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpielerEditComponent } from './spieler-edit.component';

describe('SpielerEditComponent', () => {
  let component: SpielerEditComponent;
  let fixture: ComponentFixture<SpielerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpielerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpielerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
