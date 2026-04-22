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

    const body = await request.json();
    const {
      totalAmount,
      customerName,
      customerEmail,
      customerNumber,
      customerAddress,
      customerCity,
      customerState,
      customerPincode,
      paymentMethod,
    } = body;

    // Get cart items
    const { data: cartItems } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', user.id);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        status: 'pending',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_number: customerNumber,
        customer_address: customerAddress,
        customer_city: customerCity,
        customer_state: customerState,
        customer_pincode: customerPincode,
      })
      .select()
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 400 }
      );
    }

    // Create order items and transactions
    for (const cartItem of cartItems) {
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: cartItem.product_id,
          vendor_id: cartItem.products.vendor_id,
          quantity: cartItem.quantity,
          price: cartItem.products.price,
        });

      if (!itemError) {
        // Create vendor transaction
        await supabase
          .from('vendor_transactions')
          .insert({
            vendor_id: cartItem.products.vendor_id,
            order_item_id: itemError ? null : cartItem.id,
            amount: cartItem.products.price * cartItem.quantity,
            transaction_type: 'sale',
            status: 'completed',
          });
      }
    }

    // Clear cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error: any) {
    console.error('[v0] Create order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
