import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDeleteComponent } from './p-delete.component';

describe('PDeleteComponent', () => {
  let component: PDeleteComponent;
  let fixture: ComponentFixture<PDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
