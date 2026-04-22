import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { registerUser } from '@/lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password, vendorName, contactDetails, address, email, name } = body;

    if (!userId || !password || !vendorName || !contactDetails || !address || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user account for vendor
    const user = await registerUser(userId, password, 'vendor', name || vendorName, email);

    // Create vendor record
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: user.id,
        vendor_name: vendorName,
        contact_details: contactDetails,
        address,
      })
      .select()
      .single();

    if (vendorError) {
      console.error('[v0] Vendor add error:', vendorError);
      return NextResponse.json(
        { error: vendorError.message || 'Failed to create vendor' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Vendor added successfully',
      vendor: {
        id: vendor.id,
        vendorName: vendor.vendor_name,
        contactDetails: vendor.contact_details,
        address: vendor.address,
      },
    });
  } catch (error: any) {
    console.error('[v0] Vendor add error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add vendor' },
      { status: 400 }
    );
  }
}
