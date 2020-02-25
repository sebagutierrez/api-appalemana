import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortesComponent } from './cohortes.component';

describe('CohortesComponent', () => {
  let component: CohortesComponent;
  let fixture: ComponentFixture<CohortesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
