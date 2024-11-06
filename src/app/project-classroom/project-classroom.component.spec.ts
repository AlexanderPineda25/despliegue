import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClassroomComponent } from './project-classroom.component';

describe('ProjectClassroomComponent', () => {
  let component: ProjectClassroomComponent;
  let fixture: ComponentFixture<ProjectClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectClassroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
