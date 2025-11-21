# Velvet Handlebear Barbershop Website

A modern, responsive website for Velvet Handlebear - a premium barbershop in Downtown Kitchener, Ontario. Built with Next.js 15, React 18, and Tailwind CSS.

## 🌟 Features

### Design & User Experience
- **Fully Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, elegant design with glass morphism effects
- **Smooth Animations**: Transitions and hover effects throughout
- **Dark Theme**: Sophisticated dark color scheme with accent colors
- **Custom Typography**: Amarante font family for a classic, elegant feel

### Navigation
- **Fixed Navigation Bar**: Sticky header with glass effect on scroll
- **Mobile Hamburger Menu**: Animated menu icon with rotation effect
- **Smooth Scrolling**: Seamless navigation between sections
- **Responsive Logo**: Logo scales appropriately on different screen sizes

### Sections

#### Hero Section
- **Full-screen Hero**: Eye-catching introduction with background image
- **Call-to-Action**: Prominent "Book Appointment" button
- **Responsive Typography**: Text scales beautifully across devices

#### Story Section
- **Animated Logo**: Rotating circular logo with text path animation
- **Brand Story**: Engaging narrative about the barbershop

#### Photo Gallery
- **Masonry Layout**: Dynamic grid layout with varying image heights
- **Hover Effects**: Images transition from grayscale to color on hover
- **Responsive Grid**: Adapts from 2 columns (mobile) to 4 columns (desktop)

#### Services Section
- **Service Cards**: Four main services displayed elegantly
  - Haircut ($20 - $50)
  - Beard Trim ($20 - $50)
  - Haircut & Beard Trim
  - Hot Towel Shave
- **Hover Interactions**: Service numbers change color on hover

#### Team Section
- **Team Member Cards**: Showcase of 4 master barbers
  - Mitch
  - Miguel
  - Tim
  - JP
- **Image Effects**: Grayscale images with color on hover
- **Responsive Grid**: 2 columns (mobile) to 4 columns (desktop)

#### Contact Section
- **Interactive Map**: Google Maps integration (grayscale, clickable)
- **Business Hours**: Clear display of operating hours
  - Tuesday - Friday: 10 AM - 8 PM
  - Monday, Saturday, Sunday: Closed
- **Contact Information**: Address, phone, email, and social media links
- **Responsive Layout**: Stacks vertically on mobile devices

### Booking System
- **WhatsApp Integration**: Direct booking via WhatsApp
- **Smart Form Validation**: 
  - Date validation (only Tuesday-Friday)
  - Time validation (10 AM - 8 PM)
  - Real-time error messages
- **Business Hours Display**: Shows current open/closed status
- **Responsive Modal**: Fully functional on all screen sizes

### Technical Features
- **Next.js Image Optimization**: Optimized image loading
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Client-Side Rendering**: Interactive components with React hooks
- **Scroll Detection**: Dynamic navigation bar based on scroll position

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KamalAassab/velvet-handlebear-barbershop.git
cd velvet-handlebear-barbershop
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
velvet-handlebear-barbershop/
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── menu.svg             # Mobile menu icon
│   ├── gallery1-10.webp     # Gallery images
│   └── team1-4.webp         # Team member photos
├── src/
│   ├── app/
│   │   ├── page.tsx         # Main page component
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   └── ClientBody.tsx   # Client-side wrapper
│   └── lib/                 # Utility functions (if needed)
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.2](https://nextjs.org/)
- **UI Library**: [React 18.3.1](https://react.dev/)
- **Language**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **Font**: [Amarante](https://fonts.google.com/specimen/Amarante) (Google Fonts)
- **Image Optimization**: Next.js Image component
- **Form Handling**: React state management
- **Maps**: Google Maps Embed API

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (sm-md)
- **Desktop**: 768px+ (md)
- **Large Desktop**: 1024px+ (lg)
- **Extra Large**: 1280px+ (xl)
- **2X Large**: 1536px+ (2xl)

## 🎨 Color Palette

- **Background**: `#1a1a1a` (Dark)
- **Primary Green**: `#8B9D83` (Sage Green)
- **Accent Beige**: `#B5A89A` (Warm Beige)
- **Text**: White with opacity variations
- **Borders**: White with low opacity

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run TypeScript and ESLint checks
- `npm run format` - Format code with Biome

## 🌐 Deployment

The project is configured for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify** (netlify.toml included)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KamalAassab/velvet-handlebear-barbershop)

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📞 Contact Information

**Velvet Handlebear Barbershop**
- Address: 18 Queen Street South, Kitchener, ON N2G 1V6
- Phone: 519-954-9333
- Email: info@velvethandlebear.com
- Facebook: [@velvethandlebear](https://www.facebook.com/velvethandlebear/)
- Instagram: [@velvethandlebear](https://www.instagram.com/velvethandlebear/)

## 🕐 Business Hours

- **Tuesday - Friday**: 10:00 AM - 8:00 PM
- **Monday, Saturday, Sunday**: Closed

## 👨‍💻 Development

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Biome for code formatting
- Tailwind CSS for styling

### Key Components
- Single-page application with section-based navigation
- Client-side state management with React hooks
- Form validation and error handling
- WhatsApp integration for bookings

## 📄 License

This project is private and proprietary.

## 👤 Author

**Website Design by [Kamal Aassab](https://kamal-aassab.vercel.app)**

---

Built with ❤️ for Velvet Handlebear Barbershop
