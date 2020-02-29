import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurVisitComponent } from './secteur-visit.component';

describe('SecteurVisitComponent', () => {
  let component: SecteurVisitComponent;
  let fixture: ComponentFixture<SecteurVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
