import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTakingComponent } from './position-taking.component';

describe('PositionTakingComponent', () => {
  let component: PositionTakingComponent;
  let fixture: ComponentFixture<PositionTakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionTakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
