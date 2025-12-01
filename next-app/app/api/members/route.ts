import { NextResponse } from 'next/server';
import { getMembers } from '../../services/memberService';

export async function GET() {
  const members = await getMembers();
  return NextResponse.json(members);
}
