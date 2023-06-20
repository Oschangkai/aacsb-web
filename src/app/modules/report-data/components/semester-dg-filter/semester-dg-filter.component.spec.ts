import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterDgFilterComponent } from './semester-dg-filter.component';

describe('SemesterDgFilterComponent', () => {
  let component: SemesterDgFilterComponent;
  let fixture: ComponentFixture<SemesterDgFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterDgFilterComponent]
    });
    fixture = TestBed.createComponent(SemesterDgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
