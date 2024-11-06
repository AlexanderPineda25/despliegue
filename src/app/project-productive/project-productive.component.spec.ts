import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductiveComponent } from './project-productive.component';

describe('ProjectProductiveComponent', () => {
  let component: ProjectProductiveComponent;
  let fixture: ComponentFixture<ProjectProductiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectProductiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectProductiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
