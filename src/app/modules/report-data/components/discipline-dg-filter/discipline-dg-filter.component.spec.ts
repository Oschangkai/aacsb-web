import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineDgFilterComponent } from './qualification-dg-filter.component';

describe('DepartmentDgFilterComponent', () => {
  let component: DisciplineDgFilterComponent;
  let fixture: ComponentFixture<DisciplineDgFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineDgFilterComponent]
    });
    fixture = TestBed.createComponent(DisciplineDgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
