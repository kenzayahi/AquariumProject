import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBassinModifComponent } from './one-bassin-modif.component';

describe('OneBassinModifComponent', () => {
  let component: OneBassinModifComponent;
  let fixture: ComponentFixture<OneBassinModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneBassinModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneBassinModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
