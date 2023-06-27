import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoursesModalComponent } from './delete-courses-modal.component';

describe('DeleteCoursesModalComponent', () => {
  let component: DeleteCoursesModalComponent;
  let fixture: ComponentFixture<DeleteCoursesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCoursesModalComponent]
    });
    fixture = TestBed.createComponent(DeleteCoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
