# Flint – Engineering Blueprint

## 1. What Flint Is
Flint is a production-style full-stack e-commerce marketplace for semi-custom physical products, built with a focus on clean domain modeling and real-world engineering trade-offs.

## 2. What Flint Is NOT
- Not a general multi-vendor cart system
- Not a services marketplace
- Not a fully custom product platform
- Not inventory or logistics focused in Phase 0

## 3. Core Principles
- Single user model with CUSTOMER, SELLER, and ADMIN roles
- Semi-custom products modeled via structured option groups
- Buy Now checkout (no traditional cart)
- Bounded bundled checkout (primary product + seller-curated add-ons)
- Single seller per order
- Immutable order records

## 4. Core Domain Models
- User
- Product
- ProductGroup (related alternatives)
- CheckoutSession (temporary purchase intent)
- Order (immutable transaction record)
- Review (post-purchase feedback)

## 5. Purchase Flow
1. Customer selects a product
2. Customer selects product options and optional add-on products
3. CheckoutSession is created
4. Payment is completed via Razorpay (test mode)
5. Order is created from the verified CheckoutSession

## 6. Trust & Feedback
- Reviews are allowed only after order delivery
- One review per product per order
- Product stores aggregated rating statistics

## 7. Phase Boundaries

### Phase 0
- Core backend and frontend
- Authentication (JWT + Google OAuth)
- Products, checkout, orders, reviews
- Razorpay test mode payments
- Transactional email

### Phase 1+
- Real-time buyer–seller chat
- Video calling
- Advanced search
- Notifications

## 8. Non-Negotiable Invariants
- Orders are immutable once created
- CheckoutSession is temporary and TTL-based
- Add-on products must be explicitly seller-curated
- Admin accounts are operational only