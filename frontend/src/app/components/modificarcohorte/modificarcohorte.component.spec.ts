import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcohorteComponent } from './modificarcohorte.component';

describe('ModificarcohorteComponent', () => {
  let component: ModificarcohorteComponent;
  let fixture: ComponentFixture<ModificarcohorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarcohorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcohorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
