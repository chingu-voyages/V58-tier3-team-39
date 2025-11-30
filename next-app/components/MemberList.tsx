'use client';

import { useState } from 'react';
import type { Member } from '../types/member';
import { Pagination } from './Pagination';

const PAGE_SIZE = 10;

export default function MemberListClient({ members }: { members: Member[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageMembers = members.slice(start, start + PAGE_SIZE);

  const headers = [
    'Role',
    'Gender',
    'Country',
    'Joined',
    'Voyage',
    'Tier (Solo)',
    'Tier (Voyage)',
  ];

  return (
    <>
      <div className="bg-linear-to-br from-purple-900 to-[#4c77fe] rounded-2xl shadow-lg py-1 w-full overflow-x-auto">
        <table className="border-collapse w-full table-fixed min-w-[700px]">
          <thead className="border-b-2 border-white/50">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="text-left font-bold text-lg text-white px-4 py-2 whitespace-nowrap truncate overflow-clip"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageMembers.map((m, i) => (
              <tr
                key={start + i}
                className={i < PAGE_SIZE - 1 ? 'border-b border-white/30' : ''}
              >
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.roleType || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.gender || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.countryCode || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.timestamp || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.voyage || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.soloProjectTier || 'N/A'}
                </td>
                <td className="px-4 py-2 text-white whitespace-nowrap truncate overflow-clip">
                  {m.voyageTier || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </>
  );
}
