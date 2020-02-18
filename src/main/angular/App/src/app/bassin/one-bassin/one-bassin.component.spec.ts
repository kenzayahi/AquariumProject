import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OneBassinComponent} from "./one-bassin.component";

describe('OneEmployeComponent', () => {
  let component: OneBassinComponent;
  let fixture: ComponentFixture<OneBassinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneBassinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneBassinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
