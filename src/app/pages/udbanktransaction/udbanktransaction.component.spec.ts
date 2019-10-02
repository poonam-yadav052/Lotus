import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdbanktransactionComponent } from './udbanktransaction.component';

describe('UdbanktransactionComponent', () => {
  let component: UdbanktransactionComponent;
  let fixture: ComponentFixture<UdbanktransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdbanktransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdbanktransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
