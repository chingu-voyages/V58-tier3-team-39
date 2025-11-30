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

  return (
    <>
      <div className="bg-linear-to-br from-purple-900 to-[#4c77fe] rounded-2xl shadow-lg py-1 w-full overflow-x-auto">
        <table className="border-collapse w-full table-fixed min-w-[700px]">
          <thead className="border-b-2 border-white/50">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="text-left font-semibold text-white px-4 py-2 whitespace-nowrap truncate overflow-clip"
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
                  i < members.length - 1 ? 'border-b border-white/30' : ''
                }
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
                  {m.voyageRole || 'N/A'}
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
        onChangePage={onChangePage}
      />
    </>
  );
}
