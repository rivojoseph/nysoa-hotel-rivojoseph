import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallendarEventComponent } from './callendar-event.component';

describe('CallendarEventComponent', () => {
  let component: CallendarEventComponent;
  let fixture: ComponentFixture<CallendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallendarEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
