import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceVisiteurComponent } from './espece-visiteur.component';

describe('EspeceVisiteurComponent', () => {
  let component: EspeceVisiteurComponent;
  let fixture: ComponentFixture<EspeceVisiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceVisiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
