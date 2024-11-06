import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinciplesAndValuesComponent } from './principles-and-values.component';

describe('PrinciplesAndValuesComponent', () => {
  let component: PrinciplesAndValuesComponent;
  let fixture: ComponentFixture<PrinciplesAndValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinciplesAndValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinciplesAndValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
