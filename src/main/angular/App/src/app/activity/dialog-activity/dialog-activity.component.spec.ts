import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActivityComponent } from './dialog-activity.component';

describe('DialogOverviewComponent', () => {
  let component: DialogActivityComponent;
  let fixture: ComponentFixture<DialogActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
