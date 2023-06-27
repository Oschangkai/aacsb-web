import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AacsbTeacherProfileComponent } from './aacsb-teacher-profile.component';

describe('AacsbTeacherProfileComponent', () => {
  let component: AacsbTeacherProfileComponent;
  let fixture: ComponentFixture<AacsbTeacherProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AacsbTeacherProfileComponent]
    });
    fixture = TestBed.createComponent(AacsbTeacherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
