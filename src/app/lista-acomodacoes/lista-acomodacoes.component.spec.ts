import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcomodacoesComponent } from './lista-acomodacoes.component';

describe('ListaAcomodacoesComponent', () => {
  let component: ListaAcomodacoesComponent;
  let fixture: ComponentFixture<ListaAcomodacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAcomodacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAcomodacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
