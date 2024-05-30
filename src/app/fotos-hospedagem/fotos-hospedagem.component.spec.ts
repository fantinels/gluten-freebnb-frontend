import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosHospedagemComponent } from './fotos-hospedagem.component';

describe('FotosHospedagemComponent', () => {
  let component: FotosHospedagemComponent;
  let fixture: ComponentFixture<FotosHospedagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotosHospedagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotosHospedagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
