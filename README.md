#  EventHub - Professional Event Management System

##  What's New

You asked for a **professional** website that doesn't look AI-generated or "vibes-y" - with **unique colors**, **event-related imagery**, and **proper admin/vendor registration**. Here's what we delivered:

### What Was Fixed
1. **Removed hardcoded credentials** from display
2. **Added proper admin registration** with approval code system
3. **Added vendor registration** with onboarding workflow
4. **Redesigned all pages** with professional color scheme
5. **Added hero images** related to event management
6. **Created demo accounts page** for mentor testing
7. **Professional UI/UX** throughout the application

## 🔐 Authentication System

### Three Different Registration Types

#### 1. Admin Registration (`/admin-register`)
- Name, Email, Admin ID, Password
- **Requires Approval Code**: `ADMIN2024`
- Prevents unauthorized admin account creation
- Full system access after approval

#### 2. Vendor Registration (`/vendor-register`)
- Two-step process:
  - Business information (name, type, contact, address)
  - Account credentials (name, email, ID, password)
- Business type selection (6 options)
- Automatic activation
- Dashboard access for product management

#### 3. User Registration (`/user-signup`)
- Simple 5-field form
- Email validation
- Password confirmation
- Instant account activation
- Ready to shop immediately

---

## 👥 Demo Accounts (For Your Mentor)

Visit **`/demo-accounts`** to see all pre-configured test accounts with copy buttons:

### Admin Account
```
User ID: admin
Password: admin123
Access: /admin-login
```
**Can**: Manage vendors, users, memberships, view reports

### Vendor Account (Catering)
```
User ID: vendor_catering
Password: vendor123
Access: /vendor-login
```
**Can**: Manage products, check memberships, view sales

### Vendor Account (Florist)
```
User ID: vendor_florist
Password: vendor123
Access: /vendor-login
```
**Can**: Same as catering vendor with different inventory

### Customer Account
```
User ID: user_demo
Password: user123
Access: /user-login
```
**Can**: Browse vendors, shop, manage cart, checkout

---


## 📁 Project Structure

```
/app
├── page.tsx                    # Professional home page
├── admin-login/               # Admin login (redesigned)
├── admin-register/            # Admin registration (NEW)
├── vendor-login/              # Vendor login (redesigned)
├── vendor-register/           # Vendor registration (NEW)
├── user-login/                # Customer login (redesigned)
├── user-signup/               # Customer signup (redesigned)
├── demo-accounts/             # Demo accounts page (NEW)
├── admin-dashboard/           # Admin dashboard (existing)
├── vendor-dashboard/          # Vendor dashboard (existing)
├── user-portal/               # Customer portal (existing)
└── api/
    └── auth/
        ├── login/             # Login API
        └── signup/            # Registration API

/public/images
├── event-hero.jpg            # Hero image (NEW)
├── vendor-showcase.jpg        # Vendor image (NEW)
├── admin-dashboard.jpg        # Admin image (NEW)
└── shopping-cart.jpg          # Shopping image (NEW)

/app
└── globals.css               # Updated with professional colors
```

---


##  Technical Features

### Security
- Password hashing with bcrypt
- Session-based authentication
- Approval codes for admin registration
- Form validation (client + server)
- Email format validation
- Password confirmation matching

### Database
- Relational PostgreSQL schema
- Users table (users, vendors, admins)
- Vendors table (business info)
- Products table (vendor products)
- Memberships table (subscription plans)
- Orders & Cart tables

### Code Quality
- TypeScript for type safety
- Component-based architecture
- Reusable form components
- Error handling throughout
- Loading states on buttons
- Proper validation messages

### Thank you ! 


