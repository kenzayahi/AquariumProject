import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecteurComponent } from './update-secteur.component';

describe('UpdateSecteurComponent', () => {
  let component: UpdateSecteurComponent;
  let fixture: ComponentFixture<UpdateSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
