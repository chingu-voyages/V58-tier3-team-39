import { NextResponse } from 'next/server';
import { mockMembers } from '../../mocks/members';

export async function GET() {
  return NextResponse.json(mockMembers);
}
