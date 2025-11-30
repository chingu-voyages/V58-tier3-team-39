import { Member } from '../../types/member';
import MembersContainer from '../../components/MembersContainer';

async function getMembers(): Promise<Member[]> {
  const res = await fetch('http://localhost:3000/api/members', {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('There was an error');
  }

  return res.json();
}

export default async function ListPage() {
  const members = await getMembers();

  return (
    <div className="w-full p-6 mt-14 md:mt-20 overflow-x-auto">
      <MembersContainer members={members} />
    </div>
  );
}
