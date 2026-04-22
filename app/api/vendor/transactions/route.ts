import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentUser } from '@/lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.user_type !== 'vendor') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: vendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const { data: transactions, error } = await supabase
      .from('vendor_transactions')
      .select('*')
      .eq('vendor_id', vendor.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Get vendor transactions error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch transactions' },
        { status: 400 }
      );
    }

    const totalAmount = (transactions || []).reduce(
      (sum: number, transaction: any) => sum + (transaction.amount || 0),
      0
    );

    return NextResponse.json({
      success: true,
      transactions: transactions || [],
      totalAmount,
    });
  } catch (error: any) {
    console.error('[v0] Get vendor transactions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
