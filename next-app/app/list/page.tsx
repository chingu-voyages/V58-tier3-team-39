import { Member } from '../../types/member';
import MembersContainer from '../../components/MembersContainer';
import { getMembers } from '../services/memberService';

export default async function ListPage() {
  const members = await getMembers() as Member[];

  return (
    <div className="w-full p-6 mt-14 md:mt-20 overflow-x-auto">
      <MembersContainer members={members} />
    </div>
  );
}
