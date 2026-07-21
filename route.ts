import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reference = `TGT-AD-${Date.now().toString().slice(-6)}`;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          reference,
          company: body.company ?? '',
          contact: body.contact ?? '',
          email: body.email ?? '',
          phone: body.phone ?? '',
          service: body.service ?? '',
          advert_type: body.advertType ?? null,
          format: body.format ?? null,
          start_date: body.startDate || null,
          end_date: body.endDate || null,
          duration: body.duration ?? '',
          notes: body.notes ?? '',
          media_file_name: body.fileName ?? null
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}