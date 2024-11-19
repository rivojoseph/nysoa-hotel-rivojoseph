import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDeleteComponent } from './c-delete.component';

describe('CDeleteComponent', () => {
  let component: CDeleteComponent;
  let fixture: ComponentFixture<CDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
