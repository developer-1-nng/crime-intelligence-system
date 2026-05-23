import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suspect, Case, TimelineEvent, Evidence } from '../../models/types';
import { MockDataService } from '../../services/mock-data.service';
import { MapComponent } from '../../components/map/map.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-suspect-tracker',
  imports: [MapComponent, LucideAngularModule],
  templateUrl: './suspect-tracker.component.html',
  styleUrl: './suspect-tracker.component.scss',
})
export class SuspectTrackerComponent implements OnInit {
  suspectId = input<string>();
  suspect: Suspect | null = null;
  relatedCase: Case | null = null;
  events: TimelineEvent[] = [];
  evidence: Evidence[] = [];
  selectedEventId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: MockDataService,
  ) {}

  ngOnInit(): void {
    if (!this.suspectId()) {
      this.router.navigate(['/']);
      return;
    }

    this.suspect = this.data.getSuspectById(this.suspectId()!) ?? null;
    if (!this.suspect) {
      this.router.navigate(['/']);
      return;
    }

    this.events = this.data.getEventsBySuspect(this.suspectId()!);
    this.evidence = this.data.getEvidenceBySuspect(this.suspectId()!);
    this.relatedCase = this.data.getCaseById(this.suspect.caseId) ?? null;
  }

  goBack(): void {
    if (this.relatedCase) this.router.navigate(['/case', this.relatedCase.id]);
    else this.router.navigate(['/']);
  }

  selectEvent(eventId: string): void {
    this.selectedEventId = this.selectedEventId === eventId ? null : eventId;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  getEventTypeClass(type: string): string {
    const map: Record<string, string> = {
      movement: 'movement',
      cctv: 'cctv',
      alert: 'alert',
      crime: 'crime',
    };
    return map[type] ?? 'default';
  }

  getEventIcon(type: string): string {
    const map: Record<string, string> = {
      movement: '🧭',
      cctv: '📷',
      alert: '⚠️',
      crime: '🔴',
    };
    return map[type] ?? '📍';
  }

  get cctvCount(): number {
    return this.events.filter((e) => e.type === 'cctv').length;
  }
  get alertCount(): number {
    return this.events.filter((e) => e.type === 'alert').length;
  }
  get scoreClass(): string {
    if (!this.suspect) return 'low';
    return this.suspect.suspicionScore >= 80
      ? 'high'
      : this.suspect.suspicionScore >= 60
        ? 'medium'
        : 'low';
  }
}
