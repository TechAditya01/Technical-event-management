import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, membershipNumber, durationMonths, startDate } = body;

    if (!vendorId || !membershipNumber || !durationMonths || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate end date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);

    const { data, error } = await supabase
      .from('memberships')
      .insert({
        vendor_id: vendorId,
        membership_number: membershipNumber,
        duration_months: durationMonths,
        start_date: startDate,
        end_date: end.toISOString().split('T')[0],
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('[v0] Membership add error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to add membership' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Membership added successfully',
      membership: data,
    });
  } catch (error: any) {
    console.error('[v0] Membership add error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add membership' },
      { status: 500 }
    );
  }
}
