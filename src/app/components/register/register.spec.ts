import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register'; // ← Corrección aquí

describe('RegisterComponent', () => { // ← Corrección aquí
  let component: RegisterComponent; // ← Corrección aquí
  let fixture: ComponentFixture<RegisterComponent>; // ← Corrección aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent] // ← Corrección aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent); // ← Corrección aquí
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});