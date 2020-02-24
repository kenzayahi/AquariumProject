import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEditComponent } from './calendrier-edit.component';

describe('CalendrierEditComponent', () => {
  let component: CalendrierEditComponent;
  let fixture: ComponentFixture<CalendrierEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
