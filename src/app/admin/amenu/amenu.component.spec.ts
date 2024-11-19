import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenuComponent } from './amenu.component';

describe('AmenuComponent', () => {
  let component: AmenuComponent;
  let fixture: ComponentFixture<AmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
