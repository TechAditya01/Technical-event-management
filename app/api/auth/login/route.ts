import { NextRequest, NextResponse } from 'next/server';
import { loginUser, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password, userType } = body;

    if (!userId || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await loginUser(userId, password, userType);

    // Session will be created and cookie set in loginUser
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        userId: user.user_id,
        userType: user.user_type,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
