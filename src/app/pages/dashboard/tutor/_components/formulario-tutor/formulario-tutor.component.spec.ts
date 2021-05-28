import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTutorComponent } from './formulario-tutor.component';

describe('FormularioAlunoComponent', () => {
  let component: FormularioTutorComponent;
  let fixture: ComponentFixture<FormularioTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
