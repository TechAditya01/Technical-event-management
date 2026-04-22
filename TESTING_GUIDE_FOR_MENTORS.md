# EventHub - Complete Testing Guide for Mentors & Evaluators

## 👥 Demo Accounts for Testing

### 1️⃣ Administrator Account
**Role**: Full system access with management capabilities

**Credentials:**
```
User ID: admin
Password: admin123
```

**Features to Test:**
-  Login at `/admin-login`
-  View Admin Dashboard
-  Manage Vendor Memberships (6mo, 1yr, 2yr plans)
-  Add/Update/Delete Users
-  View All Vendors
-  Access Reports & Analytics
-  View Transaction History
-  Manage System Settings

---

### 2️⃣ Vendor Accounts (Two Available)

#### Vendor A: Catering Services
**Credentials:**
```
User ID: vendor_catering
Password: vendor123
```

**Business Info:**
- Business Name: Gourmet Catering Co.
- Type: Catering Services
- Contact: +91-9876543210

**Features to Test:**
-  Login at `/vendor-login`
-  View Vendor Dashboard
-  Manage Products (Add, Edit, Delete)
-  Update Product Status
-  View Membership Status
-  Check Transaction History
-  Track Order Requests
-  View Vendor Profile

#### Vendor B: Florist
**Credentials:**
```
User ID: vendor_florist
Password: vendor123
```

**Business Info:**
- Business Name: Bloom & Blossom Florist
- Type: Florist
- Contact: +91-9876543211

**Features to Test:**
-  Same features as Vendor A
-  Different vendor dashboard data
-  Separate product inventory

---

### 3️⃣ Customer Account
**Role**: Shopping and order management

**Credentials:**
```
User ID: user_demo
Password: user123
```

**Features to Test:**
-  Login at `/user-login`
-  Browse All Vendors
-  View Vendor Products & Details
-  Search Products by Category
-  Add Products to Shopping Cart
-  Manage Cart (Update Qty, Remove Items)
-  Checkout Process
-  View Order History
-  Track Order Status

---

## 📝 Step-by-Step Testing Walkthrough

### Test 1: Exploring the Home Page
**URL**: `/` (Home)

**What to Check:**
1.  Professional header with logo and navigation
2.  Hero section with event management imagery
3.  Features showcase (6 features with icons)
4.  Role selection cards (Admin, Vendor, Customer)
5.  Footer with multiple sections
6.  Responsive design (resize browser to test mobile)

**Expected Results:**
- Clean, professional appearance
- No AI-generated looking design
- Unique color palette (Navy, Emerald, Amber)
- Professional imagery
- Smooth transitions and hover effects

---

### Test 2: Admin Registration
**URL**: `/admin-register`

**What to Try:**
1. Fill in the form with test data:
   - Name: "Test Admin"
   - Email: "admin@test.com"
   - Admin ID: "testadmin"
   - Password: "password123"
2. **Important**: Use approval code: `ADMIN2024`
3. Submit the form

**Expected Results:**
-  Form validates all fields
-  Error messages appear if approval code is wrong
-  Success confirmation shows
-  Redirects to admin login page

---

### Test 3: Vendor Registration
**URL**: `/vendor-register`

**What to Try:**
1. Complete Step 1: Business Information
   - Business Name: "My Event Services"
   - Type: Select any from dropdown
   - Contact: "+91-9999999999"
   - Address: "123 Main Street, City"
2. Click "Next: Account Details"
3. Complete Step 2: Account Information
   - Contact Name: "John Doe"
   - Email: "vendor@test.com"
   - Vendor ID: "myvendor"
   - Password & Confirm Password: "password123"
4. Submit

**Expected Results:**
-  Two-step process flows smoothly
-  Progress indicator shows current step
-  All validations work
-  Success confirmation appears
-  Redirects to vendor login

---

### Test 4: User Registration
**URL**: `/user-signup`

**What to Try:**
1. Fill in all fields:
   - Name: "John Customer"
   - Email: "user@test.com"
   - User ID: "johncustomer"
   - Password: "password123"
   - Confirm Password: "password123"
2. Submit

**Expected Results:**
-  Form validates all fields
-  Email format is checked
-  Passwords must match
-  Success confirmation appears
-  Redirects to user login

---

### Test 5: Admin Login & Features
**URL**: `/admin-login`

**Credentials:**
```
User ID: admin
Password: admin123
```

**What to Check:**
1. Login successfully
2. Explore Admin Dashboard:
   - View sidebar navigation
   - Check user/vendor management
   - Review membership management
   - View transaction reports
   - Check vendor maintenance module

**Expected Results:**
-  Professional dashboard layout
-  All modules are accessible
-  Data displays correctly
-  Forms have proper validation

---

### Test 6: Vendor Login & Features
**URL**: `/vendor-login`

**Credentials:**
```
User ID: vendor_catering (or vendor_florist)
Password: vendor123
```

**What to Check:**
1. Login successfully
2. Explore Vendor Dashboard:
   - View product management
   - Check membership status
   - Review transaction history
   - Update product information
   - Check vendor profile

**Expected Results:**
-  Vendor-specific dashboard
-  Can manage own products
-  Can update profile info
-  Transaction history shows orders

---

### Test 7: Customer Login & Shopping
**URL**: `/user-login`

**Credentials:**
```
User ID: user_demo
Password: user123
```

**What to Check:**
1. Login successfully
2. Explore Customer Portal:
   - Browse vendors
   - View vendor products
   - Search products
   - Add to cart
   - Proceed to checkout
   - View order history

**Expected Results:**
-  Clean shopping interface
-  Product listing displays correctly
-  Cart functionality works
-  Checkout process completes
-  Order history shows previous orders

---

### Test 8: View Demo Accounts Page
**URL**: `/demo-accounts`

**What to Check:**
1. All demo credentials are listed
2. Copy buttons work for each credential
3. Features listed for each role
4. Important notes section is clear

**Expected Results:**
-  Easy reference for testing
-  Copy-to-clipboard works
-  Clear role descriptions
-  All information accurate

---
