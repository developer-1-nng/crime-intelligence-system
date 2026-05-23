export type CaseStatus = 'active' | 'closed';
export type Priority = 'high' | 'medium' | 'low';
export type RiskLevel = 'high' | 'medium' | 'low';
export type EventType = 'movement' | 'cctv' | 'alert' | 'crime';

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  priority: Priority;
  location: string;
  time: string;
  description: string;
  crimeLocation: { lat: number; lng: number };
}

export interface Suspect {
  id: string;
  caseId: string;
  name: string;
  avatar?: string;
  riskLevel: RiskLevel;
  suspicionScore: number;
  lastSeen: string;
  lastSeenLocation: string;
  lastKnownLocation: { lat: number; lng: number };
  linkedReasons: string[];
}

export interface TimelineEvent {
  id: string;
  suspectId?: string;
  caseId: string;
  time: string;
  location: string;
  type: EventType;
  description: string;
  coordinates: { lat: number; lng: number };
}

export interface Evidence {
  id: string;
  caseId: string;
  suspectId?: string;
  type: 'image' | 'video' | 'document';
  timestamp: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
}

export interface MapMarker {
  id: string;
  type: 'crime' | 'suspect' | 'evidence' | 'location';
  coordinates: { lat: number; lng: number };
  label: string;
  metadata?: unknown;
}
