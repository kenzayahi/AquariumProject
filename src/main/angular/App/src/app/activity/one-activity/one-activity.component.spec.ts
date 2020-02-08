import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneActivityComponent } from './one-activity.component';

describe('OneActivityComponent', () => {
  let component: OneActivityComponent;
  let fixture: ComponentFixture<OneActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
