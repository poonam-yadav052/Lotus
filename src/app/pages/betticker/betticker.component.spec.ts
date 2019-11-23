import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettickerComponent } from './betticker.component';

describe('BettickerComponent', () => {
  let component: BettickerComponent;
  let fixture: ComponentFixture<BettickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
