import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EevenementsComponent } from './eevenements.component';

describe('EevenementsComponent', () => {
  let component: EevenementsComponent;
  let fixture: ComponentFixture<EevenementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EevenementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EevenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
