import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPedagogicalComponent } from './project-pedagogical.component';

describe('ProjectPedagogicalComponent', () => {
  let component: ProjectPedagogicalComponent;
  let fixture: ComponentFixture<ProjectPedagogicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPedagogicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPedagogicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
