import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesccComponent } from './pescc.component';

describe('PesccComponent', () => {
  let component: PesccComponent;
  let fixture: ComponentFixture<PesccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
