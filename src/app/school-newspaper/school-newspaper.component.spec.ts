import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNewspaperComponent } from './school-newspaper.component';

describe('SchoolNewspaperComponent', () => {
  let component: SchoolNewspaperComponent;
  let fixture: ComponentFixture<SchoolNewspaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolNewspaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolNewspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
