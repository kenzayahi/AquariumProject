import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OneEmployeComponent} from "./one-employe.component";

describe('OneEmployeComponent', () => {
  let component: OneEmployeComponent;
  let fixture: ComponentFixture<OneEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
