import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchambresComponent } from './listchambres.component';

describe('ListchambresComponent', () => {
  let component: ListchambresComponent;
  let fixture: ComponentFixture<ListchambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListchambresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListchambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
