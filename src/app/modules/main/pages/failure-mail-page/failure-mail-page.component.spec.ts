import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureMailPageComponent } from './failure-mail-page.component';

describe('FailureMailPageComponent', () => {
  let component: FailureMailPageComponent;
  let fixture: ComponentFixture<FailureMailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureMailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureMailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
