import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentUser } from '@/lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to clear cart' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error: any) {
    console.error('[v0] Clear cart error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
