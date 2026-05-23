import { Injectable } from '@angular/core';
import { Case, Suspect, TimelineEvent, Evidence } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  readonly cases: Case[] = [
    {
      id: 'case-1',
      title: 'Jewelry Store Robbery',
      status: 'active',
      priority: 'high',
      location: 'Downtown Plaza, 5th Avenue',
      time: '2026-03-25 14:30',
      description: 'Armed robbery at Diamond Gallery. Three suspects involved.',
      crimeLocation: { lat: 40.758, lng: -73.9855 },
    },
    {
      id: 'case-2',
      title: 'Vehicle Theft Ring',
      status: 'active',
      priority: 'high',
      location: 'Parking District, West Side',
      time: '2026-03-20 22:15',
      description:
        'Organized vehicle theft operation. Multiple suspects across city.',
      crimeLocation: { lat: 40.7489, lng: -73.968 },
    },
    {
      id: 'case-3',
      title: 'Cybercrime Investigation',
      status: 'active',
      priority: 'medium',
      location: 'Financial District',
      time: '2026-03-18 09:00',
      description: 'Data breach at multiple corporate locations.',
      crimeLocation: { lat: 40.7074, lng: -74.0113 },
    },
    {
      id: 'case-4',
      title: 'Assault Case - Park Incident',
      status: 'closed',
      priority: 'low',
      location: 'Central Park',
      time: '2026-03-10 18:45',
      description: 'Resolved assault case. Suspect in custody.',
      crimeLocation: { lat: 40.7829, lng: -73.9654 },
    },
  ];

  readonly suspects: Suspect[] = [
    {
      id: 'suspect-1',
      caseId: 'case-1',
      name: 'Marcus Chen',
      riskLevel: 'high',
      suspicionScore: 87,
      lastSeen: '2026-03-26 08:45',
      lastSeenLocation: 'Brooklyn Bridge Area',
      lastKnownLocation: { lat: 40.7061, lng: -73.9969 },
      linkedReasons: [
        'Spotted near crime scene 15 minutes before incident',
        'CCTV footage shows similar build and clothing',
        'Known associate of confirmed suspect',
      ],
    },
    {
      id: 'suspect-2',
      caseId: 'case-1',
      name: 'David Rodriguez',
      riskLevel: 'high',
      suspicionScore: 92,
      lastSeen: '2026-03-26 12:30',
      lastSeenLocation: 'Queens Boulevard',
      lastKnownLocation: { lat: 40.7282, lng: -73.7949 },
      linkedReasons: [
        'Vehicle registered to suspect parked nearby',
        'Cell phone records place him in area',
        'Prior robbery conviction',
      ],
    },
    {
      id: 'suspect-3',
      caseId: 'case-1',
      name: 'Sarah Williams',
      riskLevel: 'medium',
      suspicionScore: 65,
      lastSeen: '2026-03-25 16:00',
      lastSeenLocation: 'Manhattan Mall',
      lastKnownLocation: { lat: 40.7505, lng: -73.9934 },
      linkedReasons: [
        'Getaway driver identification match',
        'Financial connection to primary suspect',
      ],
    },
    {
      id: 'suspect-4',
      caseId: 'case-2',
      name: 'James Patterson',
      riskLevel: 'high',
      suspicionScore: 78,
      lastSeen: '2026-03-27 03:20',
      lastSeenLocation: 'Auto District',
      lastKnownLocation: { lat: 40.7589, lng: -73.9851 },
      linkedReasons: [
        'Multiple stolen vehicle parts found at residence',
        'Known member of theft ring',
      ],
    },
    {
      id: 'suspect-5',
      caseId: 'case-2',
      name: 'Elena Volkov',
      riskLevel: 'medium',
      suspicionScore: 71,
      lastSeen: '2026-03-26 19:45',
      lastSeenLocation: 'Industrial Zone',
      lastKnownLocation: { lat: 40.7414, lng: -73.9494 },
      linkedReasons: ['Chop shop owner', 'Previous arrests for vehicle theft'],
    },
    {
      id: 'suspect-6',
      caseId: 'case-3',
      name: 'Alex Kim',
      riskLevel: 'high',
      suspicionScore: 85,
      lastSeen: '2026-03-27 10:15',
      lastSeenLocation: 'Tech Hub Office',
      lastKnownLocation: { lat: 40.758, lng: -73.9855 },
      linkedReasons: [
        'Network access logs show unauthorized entry',
        'Former IT employee with access codes',
      ],
    },
  ];

  readonly timelineEvents: TimelineEvent[] = [
    {
      id: 'event-1',
      suspectId: 'suspect-1',
      caseId: 'case-1',
      time: '2026-03-25 14:15',
      location: '5th Avenue & 49th Street',
      type: 'movement',
      description: 'Suspect spotted approaching jewelry store',
      coordinates: { lat: 40.7589, lng: -73.9786 },
    },
    {
      id: 'event-2',
      suspectId: 'suspect-1',
      caseId: 'case-1',
      time: '2026-03-25 14:28',
      location: 'Diamond Gallery Entrance',
      type: 'cctv',
      description: 'CCTV captured suspect entering vicinity',
      coordinates: { lat: 40.758, lng: -73.9855 },
    },
    {
      id: 'event-3',
      suspectId: 'suspect-1',
      caseId: 'case-1',
      time: '2026-03-25 14:30',
      location: 'Diamond Gallery',
      type: 'crime',
      description: 'Robbery occurred',
      coordinates: { lat: 40.758, lng: -73.9855 },
    },
    {
      id: 'event-4',
      suspectId: 'suspect-1',
      caseId: 'case-1',
      time: '2026-03-25 14:45',
      location: 'Subway Station - 47th St',
      type: 'cctv',
      description: 'Suspect seen fleeing via subway',
      coordinates: { lat: 40.7569, lng: -73.9792 },
    },
    {
      id: 'event-5',
      suspectId: 'suspect-1',
      caseId: 'case-1',
      time: '2026-03-26 08:45',
      location: 'Brooklyn Bridge',
      type: 'alert',
      description: 'Latest sighting reported',
      coordinates: { lat: 40.7061, lng: -73.9969 },
    },
    {
      id: 'event-6',
      suspectId: 'suspect-2',
      caseId: 'case-1',
      time: '2026-03-25 14:10',
      location: 'Parking Garage - 48th St',
      type: 'movement',
      description: 'Vehicle identified',
      coordinates: { lat: 40.7599, lng: -73.9799 },
    },
    {
      id: 'event-7',
      suspectId: 'suspect-2',
      caseId: 'case-1',
      time: '2026-03-25 15:00',
      location: 'FDR Drive',
      type: 'cctv',
      description: 'Vehicle captured on traffic camera',
      coordinates: { lat: 40.7489, lng: -73.968 },
    },
    {
      id: 'event-8',
      suspectId: 'suspect-2',
      caseId: 'case-1',
      time: '2026-03-26 12:30',
      location: 'Queens Boulevard',
      type: 'alert',
      description: 'Current location detected',
      coordinates: { lat: 40.7282, lng: -73.7949 },
    },
    {
      id: 'event-9',
      suspectId: 'suspect-3',
      caseId: 'case-1',
      time: '2026-03-25 14:20',
      location: 'West Village Parking',
      type: 'movement',
      description: 'Vehicle spotted in waiting position',
      coordinates: { lat: 40.736, lng: -74.0036 },
    },
    {
      id: 'event-10',
      suspectId: 'suspect-3',
      caseId: 'case-1',
      time: '2026-03-25 14:50',
      location: 'Holland Tunnel Entrance',
      type: 'cctv',
      description: 'Vehicle captured leaving Manhattan',
      coordinates: { lat: 40.7267, lng: -74.0115 },
    },
    {
      id: 'event-11',
      suspectId: 'suspect-3',
      caseId: 'case-1',
      time: '2026-03-25 16:00',
      location: 'Manhattan Mall',
      type: 'alert',
      description: 'Suspect identified at location',
      coordinates: { lat: 40.7505, lng: -73.9934 },
    },
    {
      id: 'event-12',
      suspectId: 'suspect-4',
      caseId: 'case-2',
      time: '2026-03-26 22:30',
      location: 'West Side Highway',
      type: 'movement',
      description: 'Vehicle movement detected',
      coordinates: { lat: 40.7648, lng: -73.9808 },
    },
    {
      id: 'event-13',
      suspectId: 'suspect-4',
      caseId: 'case-2',
      time: '2026-03-27 01:15',
      location: 'Industrial Area',
      type: 'cctv',
      description: 'Suspect vehicle at chop shop location',
      coordinates: { lat: 40.745, lng: -73.955 },
    },
    {
      id: 'event-14',
      suspectId: 'suspect-4',
      caseId: 'case-2',
      time: '2026-03-27 03:20',
      location: 'Auto District',
      type: 'alert',
      description: 'Current location - suspect under surveillance',
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: 'event-15',
      suspectId: 'suspect-6',
      caseId: 'case-3',
      time: '2026-03-18 08:30',
      location: 'Financial District - Office',
      type: 'movement',
      description: 'Entered secure building',
      coordinates: { lat: 40.7074, lng: -74.0113 },
    },
    {
      id: 'event-16',
      suspectId: 'suspect-6',
      caseId: 'case-3',
      time: '2026-03-18 09:45',
      location: 'Server Room Access',
      type: 'crime',
      description: 'Unauthorized network access detected',
      coordinates: { lat: 40.7078, lng: -74.0115 },
    },
    {
      id: 'event-17',
      suspectId: 'suspect-6',
      caseId: 'case-3',
      time: '2026-03-27 10:15',
      location: 'Tech Hub Office',
      type: 'alert',
      description: 'Current known location',
      coordinates: { lat: 40.758, lng: -73.9855 },
    },
  ];

  readonly evidence: Evidence[] = [
    {
      id: 'evidence-1',
      caseId: 'case-1',
      suspectId: 'suspect-1',
      type: 'video',
      timestamp: '2026-03-25 14:28',
      location: 'Diamond Gallery - CCTV #3',
      coordinates: { lat: 40.758, lng: -73.9855 },
      description: 'Security footage showing suspect entering store',
    },
    {
      id: 'evidence-2',
      caseId: 'case-1',
      suspectId: 'suspect-2',
      type: 'image',
      timestamp: '2026-03-25 14:10',
      location: 'Parking Garage Camera',
      coordinates: { lat: 40.7599, lng: -73.9799 },
      description: 'Getaway vehicle photo',
    },
    {
      id: 'evidence-3',
      caseId: 'case-1',
      type: 'image',
      timestamp: '2026-03-25 14:45',
      location: 'Subway Station',
      coordinates: { lat: 40.7569, lng: -73.9792 },
      description: 'Multiple suspects on platform',
    },
  ];

  getCaseById(id: string): Case | undefined {
    return this.cases.find((c) => c.id === id);
  }

  getSuspectById(id: string): Suspect | undefined {
    return this.suspects.find((s) => s.id === id);
  }

  getSuspectsByCase(caseId: string): Suspect[] {
    return this.suspects.filter((s) => s.caseId === caseId);
  }

  getEventsBySuspect(suspectId: string): TimelineEvent[] {
    return this.timelineEvents
      .filter((e) => e.suspectId === suspectId)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }

  getEventsByCase(caseId: string): TimelineEvent[] {
    return this.timelineEvents
      .filter((e) => e.caseId === caseId)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }

  getEvidenceByCase(caseId: string): Evidence[] {
    return this.evidence.filter((e) => e.caseId === caseId);
  }

  getEvidenceBySuspect(suspectId: string): Evidence[] {
    return this.evidence.filter((e) => e.suspectId === suspectId);
  }
}
