import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCalendrierEmployeComponent } from './one-calendrier-employe.component';

describe('OneCalendrierComponent', () => {
  let component: OneCalendrierEmployeComponent;
  let fixture: ComponentFixture<OneCalendrierEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCalendrierEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCalendrierEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
