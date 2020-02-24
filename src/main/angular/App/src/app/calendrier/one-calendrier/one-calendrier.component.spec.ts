import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCalendrierComponent } from './one-calendrier.component';

describe('OneCalendrierComponent', () => {
  let component: OneCalendrierComponent;
  let fixture: ComponentFixture<OneCalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
