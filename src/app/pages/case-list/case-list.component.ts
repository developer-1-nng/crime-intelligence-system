import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Case } from '../../models/types';
import { MockDataService } from '../../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-case-list',
  imports: [LucideAngularModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.scss',
})
export class CaseListComponent implements OnInit {
  currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  allCases: Case[] = [];
  searchQuery: string = '';
  filterStatus: 'all' | 'active' | 'closed' = 'all';

  constructor(
    private readonly data: MockDataService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.allCases = this.data.cases;
  }

  get filteredCases(): Case[] {
    return this.allCases.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesFilter =
        this.filterStatus === 'all' || c.status === this.filterStatus;
      return matchesSearch && matchesFilter;
    });
  }

  get activeCases(): number {
    return this.allCases.filter((c) => c.status === 'active').length;
  }
  get closedCases(): number {
    return this.allCases.filter((c) => c.status === 'closed').length;
  }
  get highPriority(): number {
    return this.allCases.filter(
      (c) => c.priority === 'high' && c.status === 'active',
    ).length;
  }

  goToCase(caseId: string): void {
    this.router.navigate(['/case', caseId]);
  }

  setFilter(f: 'all' | 'active' | 'closed'): void {
    this.filterStatus = f;
  }
}
