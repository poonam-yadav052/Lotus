import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetexposureComponent } from './netexposure.component';

describe('NetexposureComponent', () => {
  let component: NetexposureComponent;
  let fixture: ComponentFixture<NetexposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetexposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetexposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
