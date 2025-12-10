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
    console.log('🗺️ Map component useEffect triggered');
    console.log('🗺️ Received countryStats:', countryStats.length, 'countries');
    console.log('🗺️ Sample stats:', countryStats.slice(0, 2));
    
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      console.log('🗺️ Initializing map for the first time');
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
    let markersAdded = 0;
    countryStats.forEach((stat) => {
      if (!stat.coordinates) {
        console.log('⚠️ Skipping country (no coordinates):', stat.countryName);
        return;
      }

      totalMembers += stat.count;
      markersAdded++;

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

      const flagUrl = stat.countryCode
        ? `https://flagcdn.com/w80/${stat.countryCode.toLowerCase()}.png`
        : null;

      // Create popup content matching the image design
      const popupContent = `
        <div style="
          min-width: 230px;
          padding: 6px 8px;
          // border: 1px solid #1F1F1F;
          // border-radius: 12px;
          background-color: #ffffff;
          // box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        ">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-weight: 700; font-size: 18px; color: #111322;">
              ${stat.countryName ?? 'Unknown'}
            </h3>
            ${
              flagUrl
                ? `<img src="${flagUrl}" alt="${stat.countryName} flag" style="width: 48px; height: 32px; object-fit: cover; border: 1px solid #D0D5DD; border-radius: 4px;" />`
                : ''
            }
          </div>
          <div style="font-size: 14px; color: #111322; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>Top Role:</strong> ${stat.topRole ?? 'N/A'}</p>
            <p style="margin: 4px 0;"><strong>Common Gender:</strong> ${stat.commonGender ?? 'N/A'}</p>
            <p style="margin: 4px 0;"><strong>Number of Chingus:</strong> ${stat.count ?? 0}</p>
          </div>
        </div>
      `;

      const marker = L.marker(stat.coordinates, { icon: customIcon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent);

      markersRef.current.push(marker);
    });

    console.log('✅ Map markers added:', markersAdded, 'Total members:', totalMembers);

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
      className="w-full h-full z-0"
      style={{
        minHeight: '500px',
        
      }}
    />
  );
}
