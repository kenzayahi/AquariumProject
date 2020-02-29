import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthetificationComponent } from './authetification.component';

describe('AuthetificationComponent', () => {
  let component: AuthetificationComponent;
  let fixture: ComponentFixture<AuthetificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthetificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthetificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
