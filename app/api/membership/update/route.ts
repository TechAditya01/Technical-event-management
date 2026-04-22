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
    const { membershipNumber, action, extensionMonths } = body;

    if (!membershipNumber) {
      return NextResponse.json(
        { error: 'Membership number is required' },
        { status: 400 }
      );
    }

    // Get current membership
    const { data: membership, error: getMembError } = await supabase
      .from('memberships')
      .select('*')
      .eq('membership_number', membershipNumber)
      .single();

    if (getMembError || !membership) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    if (action === 'extend') {
      // Extend membership
      const currentEndDate = new Date(membership.end_date);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + (extensionMonths || 6));

      const { data, error } = await supabase
        .from('memberships')
        .update({
          end_date: newEndDate.toISOString().split('T')[0],
          duration_months: membership.duration_months + (extensionMonths || 6),
          updated_at: new Date().toISOString(),
        })
        .eq('id', membership.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to extend membership' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Membership extended successfully',
        membership: data,
      });
    } else if (action === 'cancel') {
      // Cancel membership
      const { data, error } = await supabase
        .from('memberships')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', membership.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to cancel membership' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Membership cancelled successfully',
        membership: data,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('[v0] Membership update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update membership' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const membershipNumber = request.nextUrl.searchParams.get('membershipNumber');

    if (!membershipNumber) {
      return NextResponse.json(
        { error: 'Membership number is required' },
        { status: 400 }
      );
    }

    const { data: membership, error } = await supabase
      .from('memberships')
      .select('*, vendors(*)')
      .eq('membership_number', membershipNumber)
      .single();

    if (error || !membership) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      membership,
    });
  } catch (error: any) {
    console.error('[v0] Get membership error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get membership' },
      { status: 500 }
    );
  }
}
