# ID Master - Infectious Disease Learning Platform

An interactive, mobile-first educational platform for learning infectious disease concepts through case-based scenarios and interactive tools.

## Features

### 📚 Educational Modules (8 Core Topics)

1. **Sepsis & Septic Shock** - Interactive severity navigator with real-time vital signs interpretation
2. **HIV Management** - CD4 ladder showing opportunistic infection risks and ART overview
3. **Hepatitis B & C** - Serology interpreter with multiple clinical scenarios
4. **Infective Endocarditis** - Duke criteria builder for interactive diagnosis
5. **Osteomyelitis & Septic Arthritis** - Diagnostic pathways and organism patterns
6. **Skin & Soft Tissue Infections** - Case-based classifier for cellulitis, abscess, and necrotizing fasciitis
7. **STIs** - Pattern matcher for syphilis, chlamydia, gonorrhea, and more
8. **UTI & Pyelonephritis** - Interactive classification and management tool

### 🎯 Additional Features

- **Clinical Cases** - Multi-step interactive scenarios with real-time feedback
- **Assessment** - Practice questions with detailed explanations
- **Settings** - Dark/light mode toggle, about section, and educational disclaimers

### 🛠️ Technical Features

- Mobile-first, responsive design
- Dark and light mode support with persistent storage
- Offline-capable PWA (Progressive Web App)
- No data tracking or analytics
- No score tracking or progress saving
- All data is synthetic for educational purposes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   └── ui/             # UI primitives (Button, Card, etc.)
├── pages/              # Page components for each route
│   ├── HomePage.tsx    # Landing page with module overview
│   ├── SepsisPage.tsx  # Sepsis module
│   ├── HIVPage.tsx     # HIV module
│   └── ...             # Other module pages
├── store/              # State management
│   └── themeStore.ts   # Theme state (dark/light mode)
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
├── App.tsx             # Main app component with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Educational Disclaimers

⚠️ **Important**: This application is for educational purposes only.

- Not intended for clinical decision-making
- Does not provide medical advice, diagnosis, or treatment
- All scenarios and data are synthetic
- No specific drug dosing information included
- Always consult current clinical guidelines for patient care

## License

This project is for educational purposes.

## Contributing

This is an educational project. Contributions should maintain the focus on educational value and clinical accuracy.
