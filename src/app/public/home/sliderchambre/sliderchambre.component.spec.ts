import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderchambreComponent } from './sliderchambre.component';

describe('SliderchambreComponent', () => {
  let component: SliderchambreComponent;
  let fixture: ComponentFixture<SliderchambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderchambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderchambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
