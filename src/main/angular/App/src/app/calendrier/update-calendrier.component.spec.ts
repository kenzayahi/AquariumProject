import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCalendrierComponent } from './update-calendrier.component';

describe('UpdateCalendrierComponent', () => {
  let component: UpdateCalendrierComponent;
  let fixture: ComponentFixture<UpdateCalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
