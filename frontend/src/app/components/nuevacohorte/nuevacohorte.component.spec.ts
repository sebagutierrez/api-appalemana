import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevacohorteComponent } from './nuevacohorte.component';

describe('NuevacohorteComponent', () => {
  let component: NuevacohorteComponent;
  let fixture: ComponentFixture<NuevacohorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevacohorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevacohorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
