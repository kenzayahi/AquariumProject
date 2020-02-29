import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimauxVisitComponent } from './animaux-visit.component';

describe('AnimauxVisitComponent', () => {
  let component: AnimauxVisitComponent;
  let fixture: ComponentFixture<AnimauxVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimauxVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimauxVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
