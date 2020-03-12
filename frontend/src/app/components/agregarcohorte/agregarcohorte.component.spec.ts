import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarcohorteComponent } from './agregarcohorte.component';

describe('AgregarcohorteComponent', () => {
  let component: AgregarcohorteComponent;
  let fixture: ComponentFixture<AgregarcohorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarcohorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcohorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
