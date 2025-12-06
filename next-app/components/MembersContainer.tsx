'use client';

import { useMemo, useState } from 'react';
import type { Member } from '../types/member';
import MemberList from './MemberList';
import { DEFAULT_FILTERS } from '@/lib/filters';
import { FilterState } from '@/types/filterState';
import { FilterList } from './FilterList';

const PAGE_SIZE = 12;

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

export default function MembersContainer({ members }: { members: Member[] }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = useMemo(() => {
    const search = normalize(filters.search);
    const countryFilter = normalize(
      filters.country === 'All Countries' ? '' : filters.country,
    );
    const genderFilter = normalize(
      filters.gender === 'All Genders' ? '' : filters.gender,
    );
    const roleFilter = normalize(
      filters.voyageRole === 'All Roles' ? '' : filters.voyageRole,
    );
    const roleTypeFilter = normalize(
      filters.roleType === 'All Role Types' ? '' : filters.roleType,
    );
    const soloTierFilter = normalize(
      filters.soloProjectTier === 'All Tiers' ? '' : filters.soloProjectTier,
    );
    const voyageTierFilter = normalize(
      filters.voyageTier === 'All Tiers' ? '' : filters.voyageTier,
    );
    const voyageFilter = normalize(
      filters.voyage === 'All Voyages' ? '' : filters.voyage,
    );
    const yearFilter =
      filters.yearJoined === 'All Years' ? '' : filters.yearJoined;

    return members.filter((m) => {
      if (search) {
        const haystack = [
          m.countryName,
          m.voyageRole,
          m.roleType,
          m.gender,
          m.voyage,
          m.soloProjectTier,
          m.voyageTier,
        ]
          .map(normalize)
          .join(' ');
        if (!haystack.includes(search)) return false;
      }

      if (countryFilter) {
        if (normalize(m.countryName) !== countryFilter) return false;
      }

      if (genderFilter) {
        if (normalize(m.gender) !== genderFilter) return false;
      }

      if (roleFilter) {
        if (normalize(m.voyageRole) !== roleFilter) return false;
      }

      if (roleTypeFilter) {
        if (normalize(m.roleType) !== roleTypeFilter) return false;
      }

      if (soloTierFilter) {
        if (normalize(m.soloProjectTier) !== soloTierFilter) return false;
      }

      if (voyageTierFilter) {
        if (normalize(m.voyageTier) !== voyageTierFilter) return false;
      }

      if (voyageFilter) {
        if (normalize(m.voyage) !== voyageFilter) return false;
      }

      if (yearFilter) {
        const ts = m.timestamp;
        if (!ts) return false;
        const year = new Date(ts).getFullYear().toString();
        if (year !== yearFilter) return false;
      }

      return true;
    });
  }, [members, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageMembers = filteredMembers.slice(start, start + PAGE_SIZE);

  const handleChangeFilters = (next: FilterState) => {
    setFilters(next);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <FilterList
        members={members}
        filters={filters}
        onChangeFilters={handleChangeFilters}
      />
      <MemberList
        members={pageMembers}
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
