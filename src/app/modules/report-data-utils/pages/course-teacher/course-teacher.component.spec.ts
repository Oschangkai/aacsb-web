import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherComponent } from './course-teacher.component';

describe('CourseTeacherComponent', () => {
  let component: CourseTeacherComponent;
  let fixture: ComponentFixture<CourseTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTeacherComponent]
    });
    fixture = TestBed.createComponent(CourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
