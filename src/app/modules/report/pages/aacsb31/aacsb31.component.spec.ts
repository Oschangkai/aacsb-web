import { ComponentFixture, TestBed } from '@angular/core/testing';

import Aacsb31Component from './aacsb31.component';

describe('Aacsb31Component', () => {
  let component: Aacsb31Component;
  let fixture: ComponentFixture<Aacsb31Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aacsb31Component]
    });
    fixture = TestBed.createComponent(Aacsb31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
