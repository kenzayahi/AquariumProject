import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewEmployeComponent } from './dialog-overview-employe.component';

describe('DialogOverviewEmployeComponent', () => {
  let component: DialogOverviewEmployeComponent;
  let fixture: ComponentFixture<DialogOverviewEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
