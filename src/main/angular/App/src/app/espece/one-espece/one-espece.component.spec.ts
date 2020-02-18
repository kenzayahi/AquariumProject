import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEspeceComponent } from './one-espece.component';

describe('OneEspeceComponent', () => {
  let component: OneEspeceComponent;
  let fixture: ComponentFixture<OneEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
