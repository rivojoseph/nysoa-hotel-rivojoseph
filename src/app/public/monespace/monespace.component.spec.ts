import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonespaceComponent } from './monespace.component';

describe('MonespaceComponent', () => {
  let component: MonespaceComponent;
  let fixture: ComponentFixture<MonespaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonespaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
