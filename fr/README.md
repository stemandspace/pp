# FR Frontend - Independent React Application

This is a completely independent frontend application built with React, TypeScript, Vite, and Tailwind CSS. It contains all the UI components and frontend logic from the main project but operates as a standalone application.

## Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Modern React with hooks and concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **Radix UI** - Accessible, unstyled UI components
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Dark Mode** - Built-in theme switching
- 🔧 **TypeScript** - Type-safe development
- 🎯 **Wouter** - Lightweight routing
- 📊 **Recharts** - Data visualization
- 🎨 **Framer Motion** - Smooth animations

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the fr directory:

   ```bash
   cd fr
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

### Type Checking

Run TypeScript type checking:

```bash
npm run check
# or
yarn check
```

## Project Structure

```
fr/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ui/           # Radix UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and Tailwind imports
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS configuration
└── components.json       # Shadcn/ui configuration
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `start` - Alias for preview
- `check` - Run TypeScript type checking

## Dependencies

### Core Dependencies

- React & React DOM
- TypeScript
- Vite
- Tailwind CSS

### UI Components

- Radix UI primitives
- Lucide React icons
- Framer Motion animations

### Utilities

- React Hook Form
- Zod validation
- Date-fns
- Class Variance Authority
- Tailwind Merge

## Configuration

The project is configured to be completely independent with:

- Own `node_modules` directory
- Independent build process
- Self-contained configuration files
- No dependencies on parent project files

## Development Notes

- All imports use the `@/` alias pointing to the `src/` directory
- Components follow the shadcn/ui pattern
- Styling uses Tailwind CSS with custom CSS variables
- TypeScript is configured for strict type checking
- The project uses modern ES modules and Vite's fast HMR

## Troubleshooting

If you encounter any issues:

1. Delete `node_modules` and reinstall dependencies
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check TypeScript errors: `npm run check`
4. Ensure all dependencies are properly installed

## License

MIT
