# 🎮 Pokédex Challenge

## 🧾 Project Overview

The **Pokédx Challenge** was developed to provide an interactive and modern experience for exploring the fascinating world of Pokémon.  
Its goal is to **deliver a fast, beautiful, and responsive interface** that allows users to discover Pokémon, their unique types, power levels, and characteristics through an intuitive design with smooth animations.

Users can:
- Browse through a comprehensive list of Pokémon
- Search and filter by name, type, and power level
- View detailed information in interactive modals
- Experience smooth animations and transitions
- Enjoy a mobile-first responsive design
- Add the app to home screen (PWA ready)

---

## 🖼️ Interface Preview

<p align="center">
  <img src="./public/pokemonLogo.png" alt="Pokédex Logo" height="180" />
</p>

<img src="./public/pokemon-app.png" alt="Pokédex App Preview" />

---

## 🚧 Features at a Glance

- 🔍 **Smart Search** – Find Pokémon by name with real-time filtering
- 🏷️ **Type Sorting** – Filter by power level and alphabetical order
- 📱 **Mobile First** – Responsive design optimized for all devices
- ⚡ **Lightning Fast** – Optimized loading with image fallbacks and caching
- 🎨 **Smooth Animations** – Beautiful transitions powered by Framer Motion
- 📄 **Pagination** – Efficient browsing through large datasets
- 🌓 **Theme Aware** – Adaptive favicon for light/dark modes
- 📲 **PWA Ready** – Progressive Web App with offline capabilities

---

## 🧑‍💻 Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** TailwindCSS + Custom Animations
- **Routing:** TanStack Router with type-safe navigation
- **Animations:** Framer Motion for smooth transitions
- **State Management:** TanStack Query for server state
- **Data Source:** PokéAPI integration
- **Build Tool:** Vite with optimized bundling
- **Code Quality:** Biome for linting and formatting

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pokedex-challenge.git
   cd pokedex-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run code linting
- `npm run format` – Format code with Biome

---

## 🏗️ Project Structure

```
pokedex-challenge/
├── public/                 # Static assets and favicons
│   ├── favicon.ico        # Optimized multi-resolution favicon
│   ├── pokemonLogo.png    # Main logo
│   └── vector*.webp       # Background decorative images
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── pokemon-card.tsx
│   │   ├── pokemon-filters.tsx
│   │   └── pokemon-detail-modal.tsx
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API integration
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and animations
│   └── routes/          # Application routes
├── docs/                # Documentation
└── package.json
```

---

## ✨ Key Features Implementation

### 🎯 Performance Optimizations
- **Image Fallbacks:** Multiple CDN sources with graceful degradation
- **Lazy Loading:** Images load only when needed
- **Optimized Favicons:** Multiple sizes for different devices
- **Bundle Optimization:** Code splitting with TanStack Router

### 🎨 User Experience
- **Loading States:** Smooth spinners and skeleton screens
- **Error Handling:** Graceful fallbacks with retry mechanisms
- **Empty States:** Helpful messages when no results found
- **Responsive Design:** Mobile-first approach with desktop enhancements

### 🔄 Animations & Interactions
- **Card Hover Effects:** Subtle scale and shadow transitions
- **Staggered Animations:** Sequential loading for visual appeal
- **Page Transitions:** Smooth navigation between routes
- **Micro-interactions:** Button states and loading feedback

---

## 🌟 Design Highlights

- **Modern UI:** Clean, card-based layout with glassmorphism effects
- **Color System:** Type-based color coding for easy recognition
- **Typography:** Carefully chosen fonts for readability
- **Spacing:** Consistent spacing system using TailwindCSS
- **Accessibility:** High contrast ratios and keyboard navigation

---

## 📱 PWA Features

- **Installable:** Add to home screen on mobile devices
- **Optimized Icons:** Multiple favicon sizes (16x16 to 512x512)
- **Manifest:** Complete web app manifest configuration
- **Performance:** Lighthouse score optimized for speed

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **PokéAPI** - For providing the comprehensive Pokémon data
- **Framer Motion** - For the beautiful animation system
- **TailwindCSS** - For the utility-first CSS framework
- **TanStack** - For the powerful React libraries

---

<p align="center">
  Made with ❤️ and ⚡ by <strong>Josmar Junior</strong>
</p>

<p align="center">
  <em>Gotta catch 'em all! 🎮</em>
</p>
