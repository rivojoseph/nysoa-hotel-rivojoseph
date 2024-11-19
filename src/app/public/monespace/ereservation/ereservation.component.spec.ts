import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EreservationComponent } from './ereservation.component';

describe('EreservationComponent', () => {
  let component: EreservationComponent;
  let fixture: ComponentFixture<EreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EreservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
