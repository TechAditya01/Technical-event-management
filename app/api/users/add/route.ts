import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password, name, email, userType } = body;

    if (!userId || !password || !name || !email || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await registerUser(userId, password, userType, name, email);

    return NextResponse.json({
      success: true,
      message: 'User added successfully',
      user: {
        id: user.id,
        userId: user.user_id,
        name: user.name,
        email: user.email,
        userType: user.user_type,
      },
    });
  } catch (error: any) {
    console.error('[v0] User add error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add user' },
      { status: 400 }
    );
  }
}
