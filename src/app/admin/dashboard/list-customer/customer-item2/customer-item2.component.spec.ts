import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItem2Component } from './customer-item2.component';

describe('CustomerItem2Component', () => {
  let component: CustomerItem2Component;
  let fixture: ComponentFixture<CustomerItem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerItem2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
