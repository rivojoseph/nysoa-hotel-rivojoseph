import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmenusComponent } from './listmenus.component';

describe('ListmenusComponent', () => {
  let component: ListmenusComponent;
  let fixture: ComponentFixture<ListmenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
