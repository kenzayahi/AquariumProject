import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurEditComponent } from './secteur-edit.component';

describe('EditComponent', () => {
  let component: SecteurEditComponent;
  let fixture: ComponentFixture<SecteurEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
