import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdbpcsComponent } from './udbpcs.component';

describe('UdbpcsComponent', () => {
  let component: UdbpcsComponent;
  let fixture: ComponentFixture<UdbpcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdbpcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdbpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
