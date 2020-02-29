import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierUpdateComponent } from './calendrier-update.component';

describe('UpdateComponent', () => {
  let component: CalendrierUpdateComponent;
  let fixture: ComponentFixture<CalendrierUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
