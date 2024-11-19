import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatedoccupationComponent } from './datedoccupation.component';

describe('DatedoccupationComponent', () => {
  let component: DatedoccupationComponent;
  let fixture: ComponentFixture<DatedoccupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatedoccupationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatedoccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
