import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectTrackerComponent } from './suspect-tracker.component';

describe('SuspectTrackerComponent', () => {
  let component: SuspectTrackerComponent;
  let fixture: ComponentFixture<SuspectTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspectTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
