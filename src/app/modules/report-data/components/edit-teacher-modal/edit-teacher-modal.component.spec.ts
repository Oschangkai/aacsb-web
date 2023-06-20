import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherModalComponent } from './edit-teacher-modal.component';

describe('EditTeacherModalComponent', () => {
  let component: EditTeacherModalComponent;
  let fixture: ComponentFixture<EditTeacherModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeacherModalComponent]
    });
    fixture = TestBed.createComponent(EditTeacherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
