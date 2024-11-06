import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMeetingsComponent } from './agenda-meetings.component';

describe('AgendaMeetingsComponent', () => {
  let component: AgendaMeetingsComponent;
  let fixture: ComponentFixture<AgendaMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
