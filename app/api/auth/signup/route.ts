import { NextRequest, NextResponse } from 'next/server';
import { registerUser, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password, userType, name, email } = body;

    if (!userId || !password || !userType || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await registerUser(userId, password, userType, name, email);

    // Create session and set cookie
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

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
    console.error('[v0] Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Signup failed' },
      { status: 400 }
    );
  }
}
