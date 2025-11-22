import { NextResponse } from 'next/server';
import { getMembers } from '../../services/memberService';

export function GET() {
  return NextResponse.json(getMembers());
}
