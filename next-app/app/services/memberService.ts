import data from '../data/chingu_info.json';
import { mapRawMember } from '../../lib/mapMember';
import type { RawMember } from '../../lib/mapMember';
import { apiService } from './apiService';

// Get members from local JSON
export function getMembersFromLocal() {
  return (data as RawMember[]).map(mapRawMember);
}

// Fetches members from backend API, but fallback to local JSON if backend is disabled or fetch fails
export async function getMembers(filters?: any) {
  if (apiService.isBackendEnabled()) {
    try {
      return await apiService.getMembers(filters);
    } catch (error) {
      console.warn('Backend fetch failed, falling back to local JSON:', error);
      return getMembersFromLocal();
    }
  }
  return getMembersFromLocal();
}
