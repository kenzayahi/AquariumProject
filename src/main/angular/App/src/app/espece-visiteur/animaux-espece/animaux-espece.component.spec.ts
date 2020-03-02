import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimauxEspeceComponent } from './animaux-espece.component';

describe('AnimauxVisitComponent', () => {
  let component: AnimauxEspeceComponent;
  let fixture: ComponentFixture<AnimauxEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimauxEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimauxEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
