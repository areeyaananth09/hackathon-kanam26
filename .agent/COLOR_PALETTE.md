# Color Palette Guide - Get Started Theme

## Applied Globally Across All Pages

This document shows the exact color scheme from the "Get Started" page that is now applied across the entire application.

---

## 🎨 Core Color Palette

### Primary Brand Colors
- **Green-600** (`#16a34a`) - Main CTA buttons, success states, growth indicators
- **Green-700** (`#15803d`) - Hover states for green buttons
- **Green-50** (`#f0fdf4`) - Light green backgrounds for highlights

### Secondary Accent
- **Sky-600** (`#0284c1`) - Water features, secondary accents
- **Sky-50** (`#f0f9ff`) - Light blue backgrounds
- **Gradient**: `from-green-600 to-sky-600` - Hero titles, special headings

### Neutral Colors
- **White** (`#ffffff`) - Main backgrounds, cards
- **Gray-900** (`#111827`) - Primary text
- **Gray-600** (`#4b5563`) - Secondary text
- **Gray-400** (`#9ca3af`) - Tertiary text, placeholders
- **Gray-200** (`#e5e7eb`) - Borders, dividers
- **Gray-100** (`#f3f4f6`) - Subtle backgrounds
- **Gray-50** (`#f9fafb`) - Very light backgrounds

### Status Colors
- **Success**: Green-600 (`#16a34a`)
- **Warning**: Amber-500 (`#f59e0b`)
- **Error**: Red-500 (`#ef4444`)
- **Info**: Sky-600 (`#0284c1`)

---

## 📄 Page-by-Page Application

### 1. **Get Started (Homepage)** ✅
- Hero: `bg-gradient-to-b from-sky-50 to-white`
- CTA Buttons: `bg-green-600 hover:bg-green-500`
- Feature Cards: `bg-green-900` with white text
- Problem Section: `bg-gray-50` with `border-gray-100`

### 2. **Dashboard**
- Background: `bg-white`
- Irrigation Card (Yes): `bg-green-50` with green-600 accents
- Irrigation Card (No): `bg-red-50` with red-500 accents
- Weather Cards: `bg-white border-gray-200`
- Stats: Green-600 for positive, Sky-600 for water

### 3. **Analytics**
- Charts: Green-600 for growth, Sky-600 for water
- Cards: `bg-white border-gray-200`
- Success badges: `bg-green-50 text-green-700`

### 4. **Weather**
- Temperature: Gradient from sky-400 to green-500
- Cards: `bg-white border-gray-200`
- Forecast: Sky-50 backgrounds

### 5. **Profile & Settings**
- Cards: `bg-white border-gray-200`
- Edit buttons: `bg-green-600`
- Icons: Green-600 for primary actions

### 6. **Login & Signup**
- Background: `bg-gradient-to-b from-sky-50 to-white`
- Forms: `bg-white border-gray-200`
- Submit buttons: `bg-green-600 hover:bg-green-500`
- Links: `text-green-600 hover:text-green-700`

### 7. **Schedule**
- Calendar: `bg-white border-gray-200`
- Events: Green-600 for irrigation, Sky-600 for weather
- Today highlight: `bg-green-50`

### 8. **Irrigation Control**
- Active state: `bg-green-600`
- Inactive: `bg-gray-300`
- Water stats: Sky-600

---

## 🎯 Design Principles

1. **Clean & Modern**: Pure white backgrounds with subtle gray borders
2. **Green-First**: Green-600 as the primary action color
3. **Sky Accent**: Sky-600 for water-related features
4. **Gradients**: Subtle gradients for hero sections (`from-sky-50 to-white`)
5. **Soft Shadows**: `shadow-lg` with green/sky tints on hover
6. **Rounded Corners**: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for features
7. **Typography**: Bold headings (font-bold, font-extrabold), gray-600 for body text

---

## 🔄 CSS Variables (globals.css)

```css
--background: #ffffff
--foreground: #111827
--primary: #16a34a (Green-600)
--primary-hover: #15803d (Green-700)
--accent-sky: #0284c1 (Sky-600)
--card-bg: #ffffff
--card-border: #e5e7eb (Gray-200)
--success: #16a34a
--warning: #f59e0b
--error: #ef4444
```

---

## ✨ Special Effects

- **Blur Orbs**: `bg-green-100/50 blur-3xl` for decorative backgrounds
- **Hover States**: `hover:scale-105 transition-all duration-200`
- **Backdrop Blur**: `backdrop-blur-sm` on overlays
- **Border Highlights**: `border-l-4 border-green-500` for quotes/callouts

---

**Last Updated**: 2026-01-30
**Theme**: Get Started Clean & Professional
