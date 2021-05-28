import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAnimalComponent } from './tabela-animal.component';

describe('TabelaAnimalComponent', () => {
  let component: TabelaAnimalComponent;
  let fixture: ComponentFixture<TabelaAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
