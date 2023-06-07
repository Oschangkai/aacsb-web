import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aacsb32Component } from './aacsb32.component';

describe('Aacsb32Component', () => {
  let component: Aacsb32Component;
  let fixture: ComponentFixture<Aacsb32Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aacsb32Component]
    });
    fixture = TestBed.createComponent(Aacsb32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
