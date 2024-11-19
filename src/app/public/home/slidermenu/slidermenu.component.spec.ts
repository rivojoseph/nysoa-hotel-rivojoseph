import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidermenuComponent } from './slidermenu.component';

describe('SlidermenuComponent', () => {
  let component: SlidermenuComponent;
  let fixture: ComponentFixture<SlidermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidermenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
