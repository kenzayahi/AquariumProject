import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSecteurComponent } from './dialog-secteur.component';

describe('DialogOverviewComponent', () => {
  let component: DialogSecteurComponent;
  let fixture: ComponentFixture<DialogSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
