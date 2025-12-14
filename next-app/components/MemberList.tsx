'use client';

import type { Member } from '../types/member';
import { Pagination } from './Pagination';

export default function MemberList({
  members,
  currentPage,
  totalPages,
  onChangePage,
}: {
  members: Member[];
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}) {
  const headers = [
    'Role',
    'Gender',
    'Country',
    'Joined',
    'Voyage',
    'Voyage Role',
    'Tier (Solo)',
    'Tier (Voyage)',
  ];

  const badgeStyles: Record<string, string> = {
    Web: 'bg-cyan-100 text-cyan-700',
    Python: 'bg-green-100 text-green-700',
    'Tier 1': 'bg-gray-200 text-gray-700',
    'Tier 2': 'bg-green-100 text-green-700',
    'Tier 3': 'bg-pink-100 text-pink-700',
  };

  const badge = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const style = badgeStyles[value] || 'bg-gray-100 text-gray-600';
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
        {value}
      </span>
    );
  };

  return (
    <>
      <div className="border border-list-border rounded-2xl shadow-lg w-full overflow-x-auto">
        <table className="border-collapse table-fixed ">
          <thead className=" min-w-[200px] border-b border-list-border bg-secondary-bg">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="text-left font-normal  px-4 py-2 whitespace-nowrap truncate overflow-clip"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr
                key={i}
                className={
                  i < members.length - 1 ? 'border-b border-list-border' : ''
                }
              >
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {badge(m.roleType)}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.gender || 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.countryCode || 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.timestamp ? new Date(m.timestamp).getFullYear() : 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.voyage || 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.voyageRole || 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {m.soloProjectTier || 'N/A'}
                </td>
                <td className="min-w-[200px] px-4 py-2 whitespace-nowrap truncate overflow-clip">
                  {badge(m.voyageTier)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </>
  );
}
