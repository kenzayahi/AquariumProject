import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OneAnimalComponent} from './one-animal.component';

describe('OneAnimalComponent', () => {
  let component: OneAnimalComponent;
  let fixture: ComponentFixture<OneAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
