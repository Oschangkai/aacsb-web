import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDgFilterComponent } from './department-dg-filter.component';

describe('DepartmentDgFilterComponent', () => {
  let component: DepartmentDgFilterComponent;
  let fixture: ComponentFixture<DepartmentDgFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentDgFilterComponent]
    });
    fixture = TestBed.createComponent(DepartmentDgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
