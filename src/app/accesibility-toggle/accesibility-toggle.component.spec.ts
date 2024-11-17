import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilityToggleComponent } from './accesibility-toggle.component';

describe('AccesibilityToggleComponent', () => {
  let component: AccesibilityToggleComponent;
  let fixture: ComponentFixture<AccesibilityToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesibilityToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesibilityToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
