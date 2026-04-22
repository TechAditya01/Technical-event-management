import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function GET(request: NextRequest) {
  try {
    const vendorId = request.nextUrl.searchParams.get('vendorId');

    let query = supabase.from('products').select('*');

    if (vendorId) {
      query = query.eq('vendor_id', vendorId);
    }

    const { data: products, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Get products error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch products' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      products: products || [],
    });
  } catch (error: any) {
    console.error('[v0] Get products error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
