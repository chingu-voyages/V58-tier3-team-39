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
    <div className="bg-gradient-to-br from-purple-900 to-[#4c77fe] rounded-2xl shadow-lg w-full py-1">
      <table className="w-full border-collapse border-spacing-y-4">
        <thead className="border-b-2 border-white/50">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-left font-bold text-lg text-white px-6 py-4"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {members.map((m, i) => (
            <tr
              key={m.id}
              className={
                i < members.length - 1 ? 'border-b border-white/30' : ''
              }
            >
              <td className="px-6 py-4 text-white">
                <div className="font-medium">{m.role}</div>
                <div className="text-sm text-white/80">ID: {m.id}</div>
              </td>
              <td className="px-6 py-4 text-white">{m.gender}</td>
              <td className="px-6 py-4 text-white">{m.country.abbr}</td>
              <td className="px-6 py-4 text-white">{m.joinedAt}</td>
              <td className="px-6 py-4 font-semibold text-white">
                Voyage {m.voyageNumber}
              </td>
              <td className="px-6 py-4 text-white">{m.tier.solo}</td>
              <td className="px-6 py-4 text-white">{m.tier.voyage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
