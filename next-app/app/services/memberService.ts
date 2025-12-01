import data from '../data/chingu_info.json';
import { mapRawMember } from '../../lib/mapMember';
import type { RawMember } from '../../lib/mapMember';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';
const USE_BACKEND_API = process.env.USE_BACKEND_API === 'true';

// Fetch members from backend API
async function fetchMembersFromBackend() {
  const res = await fetch(`${BACKEND_API_URL}/api/members`);
  if (!res.ok) {
    throw new Error('Failed to fetch members from backend');
  }
  return res.json();
}

// Get members from local JSON
export function getMembersFromLocal() {
  return (data as RawMember[]).map(mapRawMember);
}

// fallback to local JSON
export async function getMembers() {
  if (USE_BACKEND_API) {
    try {
      return await fetchMembersFromBackend();
    } catch (error) {
      console.warn('Backend fetch failed, falling back to local JSON:', error);
      return getMembersFromLocal();
    }
  }
  return getMembersFromLocal();
}
