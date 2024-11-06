import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGovernanceComponent } from './school-governance.component';

describe('SchoolGovernanceComponent', () => {
  let component: SchoolGovernanceComponent;
  let fixture: ComponentFixture<SchoolGovernanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolGovernanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
