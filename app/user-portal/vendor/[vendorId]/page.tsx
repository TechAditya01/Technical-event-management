'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VendorProductsPage() {
  const params = useParams();
  const vendorId = params.vendorId as string;
  const [vendor, setVendor] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchVendorAndProducts();
  }, [vendorId]);

  const fetchVendorAndProducts = async () => {
    try {
      const vendorResponse = await fetch(`/api/vendors/${vendorId}`);
      if (vendorResponse.ok) {
        const vendorData = await vendorResponse.json();
        setVendor(vendorData.vendor);
      }

      const productsResponse = await fetch(`/api/products?vendorId=${vendorId}`);
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);
      }
    } catch (err) {
      console.error('[v0] Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        setSuccessMessage('Added to cart!');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    } catch (err) {
      console.error('[v0] Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Vendor: {vendor?.vendor_name || 'Loading...'}</h1>
            <p className="text-sm mt-1">{vendor?.contact_details}</p>
          </div>
          <Link href="/user-portal">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Back</Button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {successMessage && (
          <Alert className="mb-4 bg-green-50 border-green-300">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                {product.product_image && (
                  <div className="bg-white rounded h-32 mb-3 flex items-center justify-center">
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="h-full object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="font-bold mb-2">{product.product_name}</h3>
                <p className="text-lg font-bold mb-4">₹{product.price}</p>
                <p className="text-xs mb-4">
                  Status:{' '}
                  <span
                    className={
                      product.status === 'available'
                        ? 'text-green-300'
                        : 'text-red-300'
                    }
                  >
                    {product.status}
                  </span>
                </p>
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.status !== 'available'}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        )}
      </div>
    </main>
  );
}
