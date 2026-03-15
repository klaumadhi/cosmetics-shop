# 💄 Cosmetics Shop

A full-stack e-commerce web application for beauty products, built from scratch with React, Redux Toolkit, TanStack Query, and Supabase. Features a fully responsive customer storefront and a protected admin dashboard with complete CRUD functionality.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.2-764ABC?style=flat&logo=redux)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat&logo=reactquery)
![Supabase](https://img.shields.io/badge/Supabase-2.45-3ECF8E?style=flat&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=flat&logo=tailwindcss)

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Architecture](#-architecture)
- [Custom Hooks](#-custom-hooks)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)

---

## 🚀 Live Demo

> https://cosmetics-shop-two.vercel.app/

---

## ✨ Features

### 🛍️ Customer Storefront
- **Homepage** with dynamic hero carousel powered by admin-managed wallpapers
- **Category browsing** — filter products by Makeup, Skincare, Haircare, Perfume, and more
- **Live search** — search by product name or brand using Supabase `ilike` full-text queries
- **Product detail pages** with size and color variation selection, quantity picker, and similar product recommendations
- **Shopping cart** — add, remove, and manage items with real-time totals (Redux Toolkit)
- **Checkout flow** with form validation (React Hook Form) and automatic order confirmation emails (EmailJS)
- **Order confirmation page** after successful checkout
- Responsive design across mobile, tablet, and desktop (Tailwind CSS + custom breakpoints)

### 🔐 Admin Dashboard (Protected)
- Secure login via Supabase Auth — session persisted automatically
- **ProtectedRoute** component guards all admin pages; unauthenticated users are redirected to `/login`
- Create products in three modes:
  - Basic product (no variations)
  - Product with size variations (each with its own image, price, barcode & stock)
  - Product with color variations (color swatch image + product image per variant)
- Edit and delete existing products and their variations
- Manage hero wallpapers — create, edit, and delete the images shown in the homepage carousel
- All images uploaded directly to Supabase Storage with unique, collision-safe filenames

### 📦 Product Variations System
Products support two variation types:
- **Size** — e.g. 30ml, 50ml, 100ml — each with its own image, price, barcode, and stock quantity
- **Color** — e.g. Rose Gold, Nude, Red — each with a color swatch image and a product image

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | Component-driven UI, hooks, SPA |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2.2 | Global cart state management |
| [TanStack Query](https://tanstack.com/query) | 5.51 | Server state, caching, loading/error states |
| [Supabase](https://supabase.com) | 2.45 | PostgreSQL database, file storage, authentication |
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first responsive styling |
| [React Router v6](https://reactrouter.com) | 6.26 | Client-side routing and protected routes |
| [React Hook Form](https://react-hook-form.com) | 7.52 | Performant form validation |
| [EmailJS](https://www.emailjs.com) | 3.2 | Serverless order confirmation emails |
| [React Slick](https://react-slick.neostack.com) | 0.30 | Product and hero carousels |
| [React Toastify](https://fkhadra.github.io/react-toastify) | 10.0 | User-facing toast notifications |
| [React Icons](https://react-icons.github.io/react-icons) | 5.3 | Icon library |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2.4 | Password hashing utility |

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── carousel/          # Hero carousel images
│   └── images/            # Logo, empty cart, etc.
│
├── components/
│   └── layouts/
│       ├── Header.js      # Navigation, search bar, cart icon
│       └── Footer.js
│
├── hooks/                 # All data-fetching & mutation hooks
│   ├── useProducts.js
│   ├── useCategories.js
│   ├── useGetCategoryById.js
│   ├── useGetCategoryIdByName.js
│   ├── useGetProductsByCategoryId.js
│   ├── useSearchProductsByName.js
│   ├── useGetVariationsFromProductId.js
│   ├── useCreateProduct.js
│   ├── useCreateProductWithDifferentSize.js
│   ├── useCreateProductWithDifferentColors.js
│   ├── useGetWallpapers.js
│   ├── useCreateWallpaper.js
│   ├── useEditWallpaper.js
│   ├── useDeleteWallpaper.js
│   ├── useUser.js
│   ├── useLogin.js
│   └── useLogout.js
│
├── pages/
│   ├── Home/
│   │   └── HomePage.js
│   ├── Products/
│   │   ├── ProductsList.js
│   │   ├── ProductCard.js
│   │   ├── ProductDetails.js
│   │   ├── CreateProductForm.js
│   │   ├── CreateProductWithSizesForm.js
│   │   ├── CreateProductWithColorsForm.js
│   │   ├── EditProducts.js
│   │   └── DeleteProducts.js
│   ├── Cart/
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   └── OrderConfirmationPage.js
│   ├── Admin/
│   │   ├── Admin.js
│   │   ├── LoginPage.js
│   │   └── ProtectedRoute.js
│   ├── PageNotFound.js
│   └── NoResultFound.js
│
├── routes/
│   └── AllRoutes.js       # Centralised route definitions
│
├── services/              # All Supabase API calls
│   ├── supabase.js        # Supabase client initialisation
│   ├── apiProducts.js
│   ├── apiCategories.js
│   ├── apiProductVariations.js
│   ├── apiWallpaper.js
│   └── apiAdmin.js
│
├── store/
│   ├── store.js           # Redux store configuration
│   └── cartSlice.js       # Cart reducer (add, remove, clear)
│
├── ui/                    # Reusable UI primitives
│   ├── Button.js
│   ├── Spinner.js
│   ├── Popup.js
│   └── Carousel.js
│
├── utilis/
│   ├── helpers.js         # formatNumber, truncateText
│   └── ScrollToTop.js
│
└── wallpaper/
    ├── WallpaperManagementPage.js
    └── CreateWallpaperForm.js
```

---

## 🗄️ Database Schema

### `products`
| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT | Primary key |
| `name` | TEXT | Product name |
| `brand` | TEXT | Brand name |
| `description` | TEXT | Full description |
| `price` | NUMERIC | Base price |
| `discount_percentage` | NUMERIC | Optional discount |
| `image` | TEXT | Supabase Storage CDN URL |
| `barcode` | TEXT | Unique product barcode |
| `category_id` | BIGINT | FK → `categories.id` |
| `stock_quantity` | INT | Available stock |

### `productVariations`
| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT | Primary key |
| `product_id` | BIGINT | FK → `products.id` |
| `type` | TEXT | `'size'` or `'color'` |
| `value` | TEXT | e.g. `'50ml'` or `'Rose Gold'` |
| `price` | NUMERIC | Variation-specific price |
| `barcode` | TEXT | Variation barcode |
| `variation_image` | TEXT | Product shot CDN URL |
| `color_image` | TEXT | Color swatch CDN URL (color type only) |
| `stock_quantity` | INT | Variation stock |

### `categories`
| Column | Type |
|---|---|
| `id` | BIGINT |
| `name` | TEXT |
| `slug` | TEXT |

### `wallpapers`
| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT | Primary key |
| `image` | TEXT | CDN URL |
| `title` | TEXT | Hero headline |
| `subtitle` | TEXT | Hero subtext |

---

## 🏗️ Architecture

The application is structured in three clean layers:

```
Browser (React)
    └── Pages & Components
          └── Custom Hooks  (src/hooks/)
                └── Service Functions  (src/services/)
                      └── Supabase Client  (supabase.js)
```

**State is split by type:**
- **Redux Toolkit** → client-side state (shopping cart)
- **TanStack Query** → server/async state (products, categories, variations, wallpapers)
- **React local state** → UI state (modals, selected variations, quantity)

---

## 🪝 Custom Hooks

Every API interaction is abstracted into a dedicated hook, keeping components free of data-fetching logic.

| Hook | Type | Description |
|---|---|---|
| `useProducts` | Query | Paginated product list with optional column filter |
| `useCategories` | Query | All product categories |
| `useGetCategoryById` | Query | Single category by ID |
| `useGetCategoryIdByName` | Query | Resolve category name → ID for URL routing |
| `useGetProductsByCategoryId` | Query | Paginated products filtered by category |
| `useSearchProductsByName` | Query | Full-text search across `name` and `brand` |
| `useGetVariationsFromProductId` | Query | All variations for a product detail page |
| `useCreateProduct` | Mutation | Basic product creation |
| `useCreateProductWithDifferentSize` | Mutation | Product + size variations in one transaction |
| `useCreateProductWithDifferentColors` | Mutation | Product + color variations in one transaction |
| `useGetWallpapers` | Query | Hero wallpapers for homepage carousel |
| `useCreateWallpaper` | Mutation | Admin: add new wallpaper |
| `useEditWallpaper` | Mutation | Admin: update existing wallpaper |
| `useDeleteWallpaper` | Mutation | Admin: remove wallpaper from DB + Storage |
| `useUser` | Query | Current Supabase auth session |
| `useLogin` | Mutation | `supabase.auth.signInWithPassword()` |
| `useLogout` | Mutation | `supabase.auth.signOut()` |

---

## 🚦 Routing

```
/                                 → HomePage
/products                         → ProductsList (all)
/products/:category               → ProductsList (filtered)
/search/:searchTerm               → ProductsList (search results)
/product/:id                      → ProductDetails
/cart                             → CartPage
/cart/checkout                    → CheckoutPage
/order-confirmation               → OrderConfirmationPage
/login                            → LoginPage

— Protected (requires Supabase auth session) —
/admin                            → Admin dashboard
/admin/createProduct              → CreateProductForm
/admin/CreateProductWithSizesForm → CreateProductWithSizesForm
/admin/CreateProductWithColorsForm → CreateProductWithColorsForm
/admin/editProducts               → EditProducts
/admin/deleteProducts             → DeleteProducts
/admin/wallpaper                  → WallpaperManagementPage
```

`ProtectedRoute` checks `isAuthenticated` from `useUser()` on every render. If the session is missing, it redirects to `/login` using `useNavigate`.

---

## 🛒 Cart Logic

The cart lives entirely in Redux. The `cartSlice` exposes three reducers:

```js
// Add item (merges quantity if item already exists)
dispatch(addItemToCart({ id, name, price, quantity, image, variation }))

// Remove item by id
dispatch(removeItemFromCart(id))

// Clear after successful order
dispatch(clearCart())
```

**Shipping logic:** orders under 1,500 Lekë incur a 200 Lekë transport fee; orders at or above that threshold ship free.

---

## 📸 Image Upload Strategy

All images are stored in Supabase Storage under the `products_image` bucket. Filenames are made collision-safe using:

```js
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
const imageName = `${productData.barcode}-${uniqueSuffix}`;
```

The resulting public CDN URL is stored in the database `image` column (or `variation_image` / `color_image` for variants).

---

## 📧 Email on Checkout

EmailJS is called client-side during order submission — no backend required. The payload includes the buyer's full details and a formatted cart summary:

```js
emailjs.send("service_id", "template_id", {
  firstName, surname, city, streetAddress,
  postalCode, telephone, email,
  cartItems: [...],
  subtotal: "...",
}, "public_key");
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js ≥ 16
- A free [Supabase](https://supabase.com) account
- An [EmailJS](https://www.emailjs.com) account (for checkout emails)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cosmetics-shop.git
cd cosmetics-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL below in the Supabase SQL editor to create the tables
3. Create a Storage bucket named `products_image` with public access
4. Copy your project URL and `anon` key

```sql
-- Categories
create table categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text
);

-- Products
create table products (
  id bigint generated always as identity primary key,
  name text not null,
  brand text,
  description text,
  price numeric,
  discount_percentage numeric,
  image text,
  barcode text,
  category_id bigint references categories(id),
  stock_quantity int default 0
);

-- Product Variations
create table "productVariations" (
  id bigint generated always as identity primary key,
  product_id bigint references products(id) on delete cascade,
  type text check (type in ('size', 'color')),
  value text,
  price numeric,
  barcode text,
  variation_image text,
  color_image text,
  stock_quantity int default 0
);

-- Wallpapers
create table wallpapers (
  id bigint generated always as identity primary key,
  image text,
  title text,
  subtitle text
);
```

### 4. Configure environment variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables) below).

### 5. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```


## 📜 Available Scripts

```bash
npm start       # Start development server on http://localhost:3000
npm run build   # Create optimised production build
npm test        # Run test suite
npm run eject   # Eject from Create React App (irreversible)
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---
