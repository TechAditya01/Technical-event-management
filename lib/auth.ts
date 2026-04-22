import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: number): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const { error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    console.error('[v0] Session creation error:', error);
    throw error;
  }

  return sessionToken;
}

export async function getSessionUser(sessionToken: string) {
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('user_id, expires_at')
    .eq('session_token', sessionToken)
    .single();

  if (sessionError || !session) {
    return null;
  }

  // Check if session has expired
  if (new Date(session.expires_at) < new Date()) {
    // Delete expired session
    await supabase.from('sessions').delete().eq('session_token', sessionToken);
    return null;
  }

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user_id)
    .single();

  if (userError || !user) {
    return null;
  }

  return user;
}

export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  cookieStore.set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
}

export async function getSessionFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('session_token')?.value;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
}

export async function getCurrentUser() {
  const sessionToken = await getSessionFromCookie();
  if (!sessionToken) {
    return null;
  }

  return getSessionUser(sessionToken);
}

export async function loginUser(userId: string, password: string, userType: 'admin' | 'vendor' | 'user') {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .eq('user_type', userType)
    .single();

  if (error || !user) {
    throw new Error('Invalid credentials');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  const sessionToken = await createSession(user.id);
  await setSessionCookie(sessionToken);

  return user;
}

export async function registerUser(
  userId: string,
  password: string,
  userType: 'admin' | 'vendor' | 'user',
  name: string,
  email: string
) {
  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await hashPassword(password);

  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      user_id: userId,
      password_hash: passwordHash,
      user_type: userType,
      name,
      email,
    })
    .select()
    .single();

  if (error) {
    console.error('[v0] User registration error:', error);
    throw new Error('Failed to create user');
  }

  return newUser;
}
