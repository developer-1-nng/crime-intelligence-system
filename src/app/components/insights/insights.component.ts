import { Component, Input } from '@angular/core';
import { Case, Suspect, Evidence } from '../../models/types';

@Component({
  selector: 'app-insights',
  imports: [],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss',
})
export class InsightsComponent {
  @Input() selectedCase: Case | null = null;
  @Input() selectedSuspect: Suspect | null = null;
  @Input() suspects: Suspect[] = [];
  @Input() evidence: Evidence[] = [];

  get suspectEvidence(): Evidence[] {
    if (!this.selectedSuspect) return [];
    return this.evidence.filter(
      (e) => e.suspectId === this.selectedSuspect!.id,
    );
  }

  get highRiskSuspects(): Suspect[] {
    return this.suspects.filter((s) => s.riskLevel === 'high');
  }

  get scoreClass(): string {
    if (!this.selectedSuspect) return 'low';
    const score = this.selectedSuspect.suspicionScore;
    return score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
}
