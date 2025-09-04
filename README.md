# Pyramid HR - Frontend Only

A modern, responsive website for Pyramid HR - a staffing and executive search company.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Contact Form**: Interactive contact form with validation
- **Smooth Animations**: Enhanced user experience with CSS animations
- **Professional Design**: Clean, modern design suitable for business use

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── index.css      # Global styles
├── index.html         # HTML template
└── ...
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching

## Contact Form Integration

The contact form is currently set up for frontend-only mode. To integrate with a backend service, you can:

1. **Formspree**: Easy form handling service
2. **Netlify Forms**: If deploying to Netlify
3. **EmailJS**: Send emails directly from the frontend
4. **Custom API**: Connect to your own backend

## Customization

### Colors and Styling

Edit `client/src/index.css` to customize the color scheme and styling.

### Content

Update the content in `client/src/pages/home.tsx` to match your business needs.

### Images

Replace the placeholder images with your own company images.

## Deployment

This frontend can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your repository
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload the `dist` folder
- **Any CDN**: Serve the built files

## License

MIT License
