import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard'; // ← Corrección aquí

describe('DashboardComponent', () => { // ← Corrección aquí
  let component: DashboardComponent; // ← Corrección aquí
  let fixture: ComponentFixture<DashboardComponent>; // ← Corrección aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent] // ← Corrección aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent); // ← Corrección aquí
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});