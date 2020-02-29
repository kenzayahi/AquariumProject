import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UpdateBassinComponent} from "./update-bassin.component";

describe('UpdateEmployeComponent', () => {
  let component: UpdateBassinComponent;
  let fixture: ComponentFixture<UpdateBassinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBassinComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBassinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
