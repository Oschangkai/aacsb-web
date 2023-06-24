import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationDgFilterComponent } from './qualification-dg-filter.component';

describe('DepartmentDgFilterComponent', () => {
  let component: QualificationDgFilterComponent;
  let fixture: ComponentFixture<QualificationDgFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationDgFilterComponent]
    });
    fixture = TestBed.createComponent(QualificationDgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
