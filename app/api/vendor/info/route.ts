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

    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendor.id);

    return NextResponse.json({
      success: true,
      vendor,
      productCount: productCount || 0,
    });
  } catch (error: any) {
    console.error('[v0] Get vendor info error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch vendor info' },
      { status: 500 }
    );
  }
}
