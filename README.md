# 🎮 Pokédx Challenge

## 📱 Overview

Interactive Pokédx app with modern design, smooth animations, and responsive interface. Browse, search, and discover Pokémon with their types and power levels.

**Key Features:**
- 🔍 Smart search and filtering
- 📱 Mobile-first responsive design
- ⚡ Fast loading with image fallbacks
- 🎨 Smooth animations (Framer Motion)
- 📲 PWA ready

---

## 🖼️ Preview

<p align="center">
  <img src="https://llqwehnbkycggfewbtow.supabase.co/storage/v1/object/public/arena//pokemonLogo.png" alt="Pokédex Logo" height="120" />
</p>

<img src="https://llqwehnbkycggfewbtow.supabase.co/storage/v1/object/public/arena//pokemon-app.png" alt="Pokédx App Preview" />

---

## 🛠️ Tech Stack

- **React** + TypeScript + Vite
- **TailwindCSS** + Framer Motion
- **TanStack Router** + TanStack Query
- **PokéAPI** integration

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/your-username/pokedex-challenge.git
cd pokedex-challenge
npm install

# Configure environment (required)
cp .env.example .env

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the available port shown in terminal)

### Available Scripts
- `npm run dev` – Development server
- `npm run build` – Production build
- `npm run preview` – Preview build

---

## ⚙️ Environment Setup

### 1. Create `.env` file

Copy the example file and configure your environment:

```bash
cp .env.example .env
```

### 2. Configure API Settings

Edit `.env` with your preferred settings:

```bash
# PokeAPI Configuration
VITE_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2

# Optional future configurations
# VITE_APP_VERSION=1.0.0
# VITE_ENABLE_ANALYTICS=false
```

### 3. Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_POKEMON_API_BASE_URL` | PokéAPI base URL | `https://pokeapi.co/api/v2` | ❌ |

> ⚠️ **Important**: All client-side variables must start with `VITE_` prefix

### 4. Different Environments

```bash
# Development
.env.local          # Local overrides (gitignored)

# Production  
.env.production     # Production settings

# Testing
.env.test          # Test environment settings
```

---

## 📁 Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── services/           # API integration
├── types/             # TypeScript types
├── utils/             # Utilities & animations
└── routes/            # App routes
```

---

<p align="center">
  Made with ❤️ by <strong>Josmar Junior</strong> | <em>Gotta catch 'em all!</em> 🎮
</p>
