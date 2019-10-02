import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdsapComponent } from './udsap.component';

describe('UdsapComponent', () => {
  let component: UdsapComponent;
  let fixture: ComponentFixture<UdsapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdsapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdsapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
