import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentadvicependingComponent } from './paymentadvicepending.component';

describe('PaymentadvicependingComponent', () => {
  let component: PaymentadvicependingComponent;
  let fixture: ComponentFixture<PaymentadvicependingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentadvicependingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentadvicependingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
