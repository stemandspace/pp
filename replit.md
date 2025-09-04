# Pyramid HR - Recruitment Website

## Overview

Pyramid HR is a modern recruitment company website built as a full-stack application. The platform provides information about recruitment services including staffing solutions and executive search, with an integrated contact form system for lead generation. The website features a clean, professional design focused on converting visitors into potential clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript, featuring a single-page application architecture. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, styled with Tailwind CSS for a cohesive design system. The application uses Wouter for lightweight client-side routing and React Hook Form with Zod validation for form handling. State management is handled through TanStack Query for server state and React's built-in state for local UI state.

### Backend Architecture
The server follows a traditional REST API pattern using Express.js with TypeScript. The architecture separates concerns through distinct layers: route handlers for HTTP endpoints, a storage interface for data operations, and middleware for request processing. The server implements request logging, error handling, and CORS support. Email functionality is integrated through Nodemailer for contact form submissions.

### Data Storage Solution
The application uses a dual storage approach. In development, it utilizes an in-memory storage implementation for rapid iteration and testing. For production, it's configured to use PostgreSQL as the primary database with Drizzle ORM for type-safe database operations and migrations. The schema defines users and contact submissions with proper validation and relationships.

### Form Processing and Validation
Contact form submissions undergo client-side validation using Zod schemas before being sent to the server. The backend performs additional validation and stores submissions in the database while simultaneously triggering email notifications to the business owner. This ensures no leads are missed and provides immediate follow-up capability.

### Build and Development Workflow
The project uses Vite as the build tool for fast development and optimized production builds. The development server includes hot module replacement and error overlay features. The build process creates separate bundles for client and server code, with the client assets being served statically in production.

### Responsive Design System
The UI implements a mobile-first responsive design using Tailwind CSS breakpoints. The component library provides consistent spacing, typography, and color schemes across all screen sizes. The design system includes dark mode support and accessibility considerations built into the component primitives.

## External Dependencies

### Database and ORM
- **Neon Database**: Cloud PostgreSQL database service for production data storage
- **Drizzle ORM**: TypeScript ORM for database operations with automatic migrations
- **Drizzle Kit**: Database migration and introspection tools

### UI and Styling
- **Radix UI**: Unstyled, accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Lucide React**: Feather-style icon library for consistent iconography

### Form and Validation
- **React Hook Form**: Performance-focused form library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type checking
- **Hookform Resolvers**: Bridge between React Hook Form and Zod validation

### Email and Communication
- **Nodemailer**: Email sending library supporting multiple transport methods
- **SMTP Configuration**: Environment-based email service configuration

### Development and Build Tools
- **Vite**: Fast build tool and development server with HMR support
- **TypeScript**: Type safety across frontend and backend codebases
- **ESBuild**: Fast JavaScript bundler for server-side code compilation

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Router (Wouter)**: Lightweight client-side routing solution

### Development Environment
- **Replit Integration**: Specialized plugins and configuration for Replit development environment
- **TSX**: TypeScript execution for development server runtime