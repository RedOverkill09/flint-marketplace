# Flint Marketplace

Flint is a production-style full-stack e-commerce marketplace built to explore clean system design, intentional constraints, and real-world engineering trade-offs.

## Why Flint
Most learning projects focus on adding features. Flint focuses on **modeling the domain correctly**, enforcing clear boundaries, and building systems that are easy to reason about.

## Core Capabilities
- Role-based users (Customer, Seller, Admin)
- Semi-custom products with structured option groups
- Buy Now checkout (no traditional cart)
- Seller-curated add-on product purchases
- Razorpay test-mode payments
- Post-purchase review system

## Design Highlights
- Single seller per order
- Bounded checkout sessions instead of a global cart
- Immutable order records
- Order-backed reviews for trust and authenticity

## Tech Stack
- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT + Google OAuth
- Payments: Razorpay (test mode)

## Project Status
Currently in **Phase 0**: core product, checkout, order, and review flows.

For detailed system design decisions, see [`blueprint.md`](./blueprint.md).