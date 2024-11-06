import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegrComponent } from './pegr.component';

describe('PegrComponent', () => {
  let component: PegrComponent;
  let fixture: ComponentFixture<PegrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PegrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
