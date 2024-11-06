import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMarketComponent } from './school-market.component';

describe('SchoolMarketComponent', () => {
  let component: SchoolMarketComponent;
  let fixture: ComponentFixture<SchoolMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
