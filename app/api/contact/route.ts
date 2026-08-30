import { NextResponse } from 'next/server';
export async function POST(request: Request) { const data = await request.json(); if (!data.email || !data.name) return NextResponse.json({ error: 'Name and business email are required.' }, { status: 400 }); return NextResponse.json({ success: true, message: 'Request received. The MV Designers team will review your enquiry.' }); }
