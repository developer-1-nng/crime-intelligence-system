import { Component, input, OnInit } from '@angular/core';
import { Case, Evidence, Suspect, TimelineEvent } from '../../models/types';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { InsightsComponent } from '../../components/insights/insights.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-case-detail',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    InsightsComponent,
    MapComponent,
  ],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.scss',
})
export class CaseDetailComponent implements OnInit {
  selectedCase: Case | null = null;
  caseId = input<string>();
  suspects: Suspect[] = [];
  timelineEvents: TimelineEvent[] = [];
  evidence: Evidence[] = [];
  selectedEventId: string | null = null;
  selectedSuspects: Suspect[] = [];
  constructor(
    private readonly data: MockDataService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.caseId()) this.goBack();
    this.selectedCase = this.data.getCaseById(this.caseId()!) ?? null;
    this.suspects = this.data.getSuspectsByCase(this.caseId()!);
    this.timelineEvents = this.data.getEventsByCase(this.caseId()!);
    this.evidence = this.data.getEvidenceByCase(this.caseId()!);
    if (!this.selectedCase) this.router.navigate(['/']);
  }

  goToSuspect(id: string): void {
    this.router.navigate(['/suspect', id]);
  }

  onEventClick(eventId: string): void {
    this.selectedEventId = this.selectedEventId === eventId ? null : eventId;
  }

  getInitials(name: string): string {
    return (name || '')
      .split(' ')
      .filter((part) => !!part)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

  getRiskBorderClass(risk: string): string {
    return (
      {
        high: 'suspect-card--high',
        medium: 'suspect-card--medium',
        low: 'suspect-card--low',
      }[risk] ?? ''
    );
  }

  getScoreClass(score: number): string {
    return score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  suspectSelected(event: Event, suspect: Suspect) {
    const isChecked = (event.target as HTMLInputElement).checked;
    debugger;
    if (isChecked) {
      this.selectedSuspects = [...this.selectedSuspects, suspect];
    } else {
      this.selectedSuspects = this.selectedSuspects.filter(
        (s) => s.id !== suspect.id,
      );
    }
  }
}
