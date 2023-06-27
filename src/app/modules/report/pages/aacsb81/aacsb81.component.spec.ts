import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aacsb81Component } from './aacsb81.component';

describe('Aacsb81Component', () => {
  let component: Aacsb81Component;
  let fixture: ComponentFixture<Aacsb81Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aacsb81Component]
    });
    fixture = TestBed.createComponent(Aacsb81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
