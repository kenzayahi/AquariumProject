import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassinsVisitComponent } from './bassins-visit.component';

describe('BassinsComponent', () => {
  let component: BassinsVisitComponent;
  let fixture: ComponentFixture<BassinsVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassinsVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassinsVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
