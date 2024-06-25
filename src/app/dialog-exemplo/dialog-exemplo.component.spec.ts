import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExemploComponent } from './dialog-exemplo.component';

describe('DialogExemploComponent', () => {
  let component: DialogExemploComponent;
  let fixture: ComponentFixture<DialogExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogExemploComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
