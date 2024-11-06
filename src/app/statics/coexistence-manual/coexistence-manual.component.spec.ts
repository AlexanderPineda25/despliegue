import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoexistenceManualComponent } from './coexistence-manual.component';

describe('CoexistenceManualComponent', () => {
  let component: CoexistenceManualComponent;
  let fixture: ComponentFixture<CoexistenceManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoexistenceManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoexistenceManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
