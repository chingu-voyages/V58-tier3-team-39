'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CountryStats } from '../lib/memberStats';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  countryStats: CountryStats[];
  onMemberCountChange?: (count: number, countryCount: number) => void;
}

export default function Map({ countryStats, onMemberCountChange }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for each country
    let totalMembers = 0;
    countryStats.forEach((stat) => {
      if (!stat.coordinates) return;

      totalMembers += stat.count;

      // Create custom marker with number
      const markerHtml = `
        <div style="
          background-color: #4D77FF;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          ${stat.count}
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      // Create popup content matching the image design
      const popupContent = `
        <div style="min-width: 250px; padding: 12px; border: 1px solid #000;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-weight: bold; font-size: 18px;">
              ${stat.countryName}
            </h3>
          </div>
          <p style="margin: 6px 0; font-size: 14px;">
            <strong>Top Role:</strong> ${stat.topRole}
          </p>
          <p style="margin: 6px 0; font-size: 14px;">
            <strong>Common Gender:</strong> ${stat.commonGender}
          </p>
          <p style="margin: 6px 0; font-size: 14px;">
            <strong>Number of Chingus:</strong> ${stat.count}
          </p>
        </div>
      `;

      const marker = L.marker(stat.coordinates, { icon: customIcon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent);

      markersRef.current.push(marker);
    });

    // Notify parent of member count changes
    if (onMemberCountChange) {
      onMemberCountChange(totalMembers, countryStats.length);
    }

    // Cleanup function
    return () => {
      markersRef.current.forEach((marker) => {
        mapRef.current?.removeLayer(marker);
      });
    };
  }, [countryStats, onMemberCountChange]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{
        minHeight: '500px',
        backgroundColor: '#E6F3FF',
      }}
    />
  );
}

