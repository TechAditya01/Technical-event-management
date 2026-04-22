import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function GET(request: NextRequest) {
  try {
    const { data: transactions, error } = await supabase
      .from('vendor_transactions')
      .select('*, vendors(vendor_name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Get transactions error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch transactions' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      transactions: transactions || [],
    });
  } catch (error: any) {
    console.error('[v0] Get transactions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
