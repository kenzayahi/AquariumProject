import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSecteurComponent } from './one-secteur.component';

describe('OneSecteurComponent', () => {
  let component: OneSecteurComponent;
  let fixture: ComponentFixture<OneSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
