import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmessagesComponent } from './emessages.component';

describe('EmessagesComponent', () => {
  let component: EmessagesComponent;
  let fixture: ComponentFixture<EmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
