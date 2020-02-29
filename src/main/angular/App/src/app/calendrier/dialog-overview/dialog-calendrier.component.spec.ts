import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalendrierComponent } from './dialog-calendrier.component';

describe('DialogOverviewComponent', () => {
  let component: DialogCalendrierComponent;
  let fixture: ComponentFixture<DialogCalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
