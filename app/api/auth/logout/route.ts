import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie, getSessionFromCookie } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getSessionFromCookie();

    if (sessionToken) {
      // Delete session from database
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });

      await supabase.from('sessions').delete().eq('session_token', sessionToken);
    }

    await clearSessionCookie();

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('[v0] Logout error:', error);
    return NextResponse.json(
      { error: error.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
