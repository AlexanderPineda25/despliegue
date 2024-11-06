import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRealityGamesComponent } from './virtual-reality-games.component';

describe('VirtualRealityGamesComponent', () => {
  let component: VirtualRealityGamesComponent;
  let fixture: ComponentFixture<VirtualRealityGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualRealityGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualRealityGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
