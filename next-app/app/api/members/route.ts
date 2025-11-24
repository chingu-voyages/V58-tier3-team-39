import { NextResponse } from 'next/server';
import { getMembers } from '../../services/memberService';

export async function GET() {
  const members = getMembers();
  return NextResponse.json(members);
}
