import { Member } from '../types/member';

async function getMembers(): Promise<Member[]> {
  const res = await fetch('http://localhost:3000/api/members', {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error('There was an error');
  }

  return res.json();
}

export default async function MemberList() {
  const members = await getMembers();

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
              <td className="px-4 py-2 text-white font-semibold whitespace-nowrap truncate overflow-clip">
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
  );
}
