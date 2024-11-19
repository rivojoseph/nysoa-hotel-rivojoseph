import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommandesComponent } from './ecommandes.component';

describe('EcommandesComponent', () => {
  let component: EcommandesComponent;
  let fixture: ComponentFixture<EcommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
