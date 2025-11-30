import data from '../data/chingu_info.json';
import { mapRawMember } from '../../lib/mapMember';
import type { RawMember } from '../../lib/mapMember';

export function getMembers() {
  return (data as RawMember[]).map(mapRawMember);
}
