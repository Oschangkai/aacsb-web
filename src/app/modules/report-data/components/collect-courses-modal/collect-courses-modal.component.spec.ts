import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectCoursesModalComponent } from './collect-courses-modal.component';

describe('CollectCoursesModalComponent', () => {
  let component: CollectCoursesModalComponent;
  let fixture: ComponentFixture<CollectCoursesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectCoursesModalComponent]
    });
    fixture = TestBed.createComponent(CollectCoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
