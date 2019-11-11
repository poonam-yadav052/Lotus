import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingrecordsComponent } from './pendingrecords.component';

describe('PendingrecordsComponent', () => {
  let component: PendingrecordsComponent;
  let fixture: ComponentFixture<PendingrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
