
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';
const USE_BACKEND_API = process.env.NEXT_PUBLIC_USE_BACKEND_API === 'true';

interface FilterParams {
  gender?: string;
  country?: string;
  yearJoined?: string;
  roleType?: string;
  role?: string;
  soloProjectTier?: string;
  voyageTier?: string;
  voyage?: string;
  search?: string;
}


function buildQueryParams(filters?: FilterParams): string {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  if (filters.gender && filters.gender !== 'All Genders') {
    // uppercase for backend matching
    params.append('gender', filters.gender?.toUpperCase() ?? '');
  }
  if (filters.country && filters.country !== 'All Countries') {
    console.log('🌍 Filtering by country:', filters.country);
    params.append('country', filters.country);
  }
  if (filters.yearJoined && filters.yearJoined !== 'All Years') {
    params.append('yearJoined', filters.yearJoined);
  }
  if (filters.roleType && filters.roleType !== 'All Role Types') {
    params.append('roleType', filters.roleType);
  }
  if (filters.role && filters.role !== 'All Roles') {
    params.append('role', filters.role);
  }
  if (filters.soloProjectTier && filters.soloProjectTier !== 'All Tiers') {
    const tierMatch = filters.soloProjectTier.match(/\d+/);
    if (tierMatch) params.append('soloProjectTier', tierMatch[0]);
  }
  if (filters.voyageTier && filters.voyageTier !== 'All Tiers') {
    const tierMatch = filters.voyageTier.match(/\d+/);
    if (tierMatch) params.append('voyageTier', tierMatch[0]);
  }
  if (filters.voyage && filters.voyage !== 'All Voyages') {
    params.append('voyage', filters.voyage);
  }
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

// fetch testing function. Refactoring code later.
async function fetchFromBackend<T>(endpoint: string): Promise<T> {
  const url = `${BACKEND_API_URL}${endpoint}`;
  console.log('🌐 Fetching from:', url);
  console.log('📋 BACKEND_API_URL:', BACKEND_API_URL);
  console.log('🔧 USE_BACKEND_API:', USE_BACKEND_API);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
  }
  
  return response.json();
}

export const apiService = {
  
  isBackendEnabled: () => USE_BACKEND_API,
  
  
  async getMembers(filters?: FilterParams) {
    const queryParams = buildQueryParams(filters);
    return fetchFromBackend(`/api/members${queryParams}`);
  },
  
  
  async getMemberById(id: number) {
    return fetchFromBackend(`/api/members/${id}`);
  },
  
  
  async getDemographicsStats(filters?: FilterParams) {
    const queryParams = buildQueryParams(filters);
    return fetchFromBackend(`/api/members/stats/demographics${queryParams}`);
  },
  
  
  async getCountryStats(filters?: FilterParams) {
    const queryParams = buildQueryParams(filters);
    return fetchFromBackend(`/api/members/stats/countries-enhanced${queryParams}`);
  },
  
  
  async getSummaryStats() {
    return fetchFromBackend(`/api/members/stats/summary`);
  },
  
  // Create new member
  async createMember(member: any) {
    const url = `${BACKEND_API_URL}/api/members`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create member: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Update existing member
  async updateMember(id: number, member: any) {
    const url = `${BACKEND_API_URL}/api/members/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update member: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Delete member
  async deleteMember(id: number) {
    const url = `${BACKEND_API_URL}/api/members/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete member: ${response.statusText}`);
    }
    
    return response.status === 204;
  },
};
