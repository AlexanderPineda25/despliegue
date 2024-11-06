import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewspaperComponent } from './create-newspaper.component';

describe('CreateNewspaperComponent', () => {
  let component: CreateNewspaperComponent;
  let fixture: ComponentFixture<CreateNewspaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewspaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
