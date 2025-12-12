import { apiService } from './apiService';
import { getDemographipcsStats } from '@/lib/dataHelpers';
import { processMemberData } from '@/lib/memberStats';
import { getMembersFromLocal } from './memberService';


interface BackendCountryStats {
  countryName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  count: number;
  topRole: string;
  commonGender: string;
}

// Fetch demographics statistics with fallback to local JSON
export async function getDemographicsStats(filters?: any) {
  if (apiService.isBackendEnabled()) {
    try {
      return await apiService.getDemographicsStats(filters);
    } catch (error) {
      console.warn('Backend demographics fetch failed, processing locally:', error);
      const members = getMembersFromLocal();
      return getDemographipcsStats(members);
    }
  }
  
  // Fallback: compute locally
  const members = getMembersFromLocal();
  return getDemographipcsStats(members);
}

// Fetch country statistics with fallback to local computation
export async function getCountryStats(filters?: any) {
  if (apiService.isBackendEnabled()) {
    try {
      const backendStats = await apiService.getCountryStats(filters) as BackendCountryStats[];
      
      // Transform backend format to frontend format
      // Backend returns: { latitude, longitude, ... }
      // Frontend expects: { coordinates: [lat, lng], members: [], ... }
      const transformed = backendStats.map((stat) => ({
        countryName: stat.countryName,
        countryCode: stat.countryCode,
        coordinates: stat.latitude && stat.longitude 
          ? [stat.latitude, stat.longitude] as [number, number]
          : null,
        count: stat.count,
        topRole: stat.topRole,
        commonGender: stat.commonGender,
        members: [] 
      }));
      return transformed;
    } catch (error) {
      console.warn('⚠️ Backend country stats fetch failed, processing locally:', error);
      const members = getMembersFromLocal();
      return processMemberData(members, filters);
    }
  }
  
  // Fallback
  const members = getMembersFromLocal();
  return processMemberData(members, filters);
}

// Fetch summary statistics with fallback to local json processing
export async function getSummaryStats() {
  if (apiService.isBackendEnabled()) {
    try {
      return await apiService.getSummaryStats();
    } catch (error) {
      console.warn('Backend summary stats fetch failed, using local data:', error);
      const members = getMembersFromLocal();
      return {
        totalMembers: members.length,
        totalCountries: new Set(members.map(m => m.countryName)).size,
        activeTeams: 30,
        tierLevels: 3,   
      };
    }
  }
  
  
  const members = getMembersFromLocal();
  return {
    totalMembers: members.length,
    totalCountries: new Set(members.map(m => m.countryName)).size,
    activeTeams: 30, 
    tierLevels: 3,   
  };
}
