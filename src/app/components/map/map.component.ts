import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Case, Suspect, Evidence, TimelineEvent } from '../../models/types';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  @Input() selectedCase: Case | null = null;
  @Input() selectedSuspect: Suspect | null = null;
  @Input() suspects: Suspect[] = [];
  @Input() evidence: Evidence[] = [];
  @Input() timelineEvents: TimelineEvent[] = [];
  @Input() focusEventId: string | null = null;

  private map: L.Map | null = null;
  private markersLayer = L.layerGroup();
  private pathLayer = L.layerGroup();
  private initialized = false;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      if (changes['focusEventId'] && this.focusEventId) {
        this.focusOnEvent(this.focusEventId);
      } else {
        setTimeout(() => this.refreshMarkers(), 0);
      }
    }
  }

  private initMap(): void {
    if (!this.mapContainer?.nativeElement) return;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [40.73, -73.99],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.pathLayer.addTo(this.map);
    this.initialized = true;
    this.refreshMarkers();
  }

  private refreshMarkers(): void {
    if (!this.map) return;
    this.markersLayer.clearLayers();
    this.pathLayer.clearLayers();

    if (!this.selectedCase) return;

    // Crime scene marker
    this.addCrimeMarker();

    // Suspect markers
    const suspectsToShow = this.selectedSuspect
      ? [this.selectedSuspect]
      : this.suspects;
    suspectsToShow.forEach((s) => this.addSuspectMarker(s));

    // Movement path for selected suspect
    if (this.selectedSuspect) {
      this.drawMovementPath();
      this.addEvidenceMarkers();
      this.addMovementDots();
    }

    // Fit bounds
    this.fitBounds();
  }

  private addCrimeMarker(): void {
    if (!this.selectedCase || !this.map) return;
    const { lat, lng } = this.selectedCase.crimeLocation;

    const icon = L.divIcon({
      html: `
        <div class="map-marker map-marker--crime">
          <span>🔴</span>
        </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      className: '',
    });

    const popup = `
      <div class="map-popup">
        <div class="map-popup__title">Crime Scene</div>
        <div class="map-popup__sub">${this.selectedCase.location}</div>
        <div class="map-popup__time">${this.selectedCase.time}</div>
      </div>`;

    L.marker([lat, lng], { icon }).bindPopup(popup).addTo(this.markersLayer);
  }

  private addSuspectMarker(suspect: Suspect): void {
    if (!this.map) return;
    const { lat, lng } = suspect.lastKnownLocation;
    const riskClass = `map-marker--${suspect.riskLevel}`;
    const isSelected = this.selectedSuspect?.id === suspect.id;

    const icon = L.divIcon({
      html: `
        <div class="map-marker ${riskClass} ${isSelected ? 'map-marker--focused' : ''}">
          <span>👤</span>
        </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      className: '',
    });

    const popup = `
      <div class="map-popup">
        <div class="map-popup__title">${suspect.name}</div>
        <div class="map-popup__row">
          <span class="map-popup__label">Risk:</span>
          <span class="map-popup__risk map-popup__risk--${suspect.riskLevel}">${suspect.riskLevel.toUpperCase()}</span>
        </div>
        <div class="map-popup__row">
          <span class="map-popup__label">Score:</span>
          <span>${suspect.suspicionScore}%</span>
        </div>
        <div class="map-popup__row">
          <span class="map-popup__label">Last seen:</span>
          <span>${suspect.lastSeen}</span>
        </div>
        <div class="map-popup__sub">${suspect.lastSeenLocation}</div>
      </div>`;

    L.marker([lat, lng], { icon }).bindPopup(popup).addTo(this.markersLayer);
  }

  private drawMovementPath(): void {
    if (!this.selectedSuspect || !this.map) return;

    const events = this.timelineEvents
      .filter((e) => e.suspectId === this.selectedSuspect!.id)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    if (events.length < 2) return;

    const latlngs = events.map(
      (e) => [e.coordinates.lat, e.coordinates.lng] as L.LatLngTuple,
    );

    const route = L.polyline(latlngs, {
      color: '#f59e0b',
      weight: 3,
      opacity: 0.8,
      dashArray: '8, 6',
    }).addTo(this.pathLayer);

    // Add directional arrows using Leaflet PolylineDecorator
    L.polylineDecorator(route, {
      patterns: [
        {
          offset: '0%',
          repeat: '30px',
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            polygon: false,
            pathOptions: {
              stroke: true,
              color: '#f59e0b',
              weight: 1,
              fill: true,
              fillColor: '#f59e0b',
              fillOpacity: 0.9,
            },
          }),
        },
      ],
    }).addTo(this.pathLayer);
  }

  private addEvidenceMarkers(): void {
    if (!this.selectedSuspect || !this.map) return;

    const suspectEvidence = this.evidence.filter(
      (e) => e.suspectId === this.selectedSuspect!.id,
    );

    suspectEvidence.forEach((ev) => {
      const { lat, lng } = ev.coordinates;
      const icon = L.divIcon({
        html: `<div class="map-marker map-marker--evidence"><span>📷</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: '',
      });

      const popup = `
        <div class="map-popup">
          <div class="map-popup__title">Evidence: ${ev.type}</div>
          <div class="map-popup__sub">${ev.location}</div>
          <div class="map-popup__time">${ev.timestamp}</div>
          <div class="map-popup__desc">${ev.description}</div>
        </div>`;

      L.marker([lat, lng], { icon }).bindPopup(popup).addTo(this.markersLayer);
    });
  }

  private addMovementDots(): void {
    if (!this.selectedSuspect || !this.map) return;

    this.timelineEvents
      .filter(
        (e) =>
          e.suspectId === this.selectedSuspect!.id && e.type === 'movement',
      )
      .forEach((e) => {
        const icon = L.divIcon({
          html: `<div class="map-dot"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
          className: '',
        });
        L.marker([e.coordinates.lat, e.coordinates.lng], { icon }).addTo(
          this.markersLayer,
        );
      });
  }

  private focusOnEvent(eventId: string): void {
    const event = this.timelineEvents.find((e) => e.id === eventId);
    if (event && this.map) {
      this.map.setView([event.coordinates.lat, event.coordinates.lng], 15, {
        animate: true,
        duration: 0.5,
      });

      // Flash marker
      const icon = L.divIcon({
        html: `<div class="map-marker map-marker--flash"><span>📍</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        className: '',
      });
      const flashMarker = L.marker(
        [event.coordinates.lat, event.coordinates.lng],
        { icon },
      ).addTo(this.markersLayer);
      setTimeout(() => this.markersLayer.removeLayer(flashMarker), 2000);
    }
  }

  private fitBounds(): void {
    if (!this.map || !this.selectedCase) return;

    const points: L.LatLng[] = [];

    if (this.selectedCase.crimeLocation) {
      points.push(
        L.latLng(
          this.selectedCase.crimeLocation.lat,
          this.selectedCase.crimeLocation.lng,
        ),
      );
    }

    const suspectsToShow = this.selectedSuspect
      ? [this.selectedSuspect]
      : this.suspects;
    suspectsToShow.forEach((s) => {
      points.push(L.latLng(s.lastKnownLocation.lat, s.lastKnownLocation.lng));
    });

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      this.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }
}
