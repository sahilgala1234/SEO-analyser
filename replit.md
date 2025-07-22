# SEO Analyzer Application

## Overview

This is a full-stack SEO analysis application built with React, Express, and TypeScript. The application allows users to analyze websites for SEO optimization by extracting and evaluating meta tags, Open Graph tags, Twitter Card tags, and other SEO-related elements. It provides detailed recommendations and scoring to help improve website SEO performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: REST API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Custom request/response logging middleware

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Storage**: Dual storage implementation (In-memory and database-backed)

## Key Components

### Frontend Components
1. **SEO Analyzer**: Main application component that orchestrates the analysis workflow
2. **URL Input**: Form component for website URL submission
3. **SEO Overview**: Dashboard showing overall SEO health and metrics
4. **Basic SEO Tags**: Analysis of title and meta description tags
5. **Social Tags**: Open Graph and Twitter Card tag analysis
6. **Preview Cards**: Visual previews of how content appears in search and social
7. **Recommendations**: Actionable suggestions for SEO improvements

### Backend Services
1. **Route Handler**: Express routes for SEO analysis endpoints
2. **Storage Layer**: Abstracted storage interface with memory and database implementations
3. **Web Scraping**: Axios + Cheerio for fetching and parsing website content
4. **SEO Analysis Engine**: Logic for extracting and scoring SEO elements

### Shared Schema
- **Database Schema**: Drizzle schema definitions for SEO analysis data
- **Validation**: Zod schemas for API request/response validation
- **Type Safety**: Shared TypeScript types between frontend and backend

## Data Flow

1. **User Input**: User enters a website URL in the frontend form
2. **API Request**: Frontend sends POST request to `/api/seo/analyze` endpoint
3. **Cache Check**: Backend checks for existing analysis in storage
4. **Web Scraping**: If not cached, backend fetches website HTML content
5. **Content Parsing**: Cheerio parses HTML to extract SEO-relevant tags
6. **Analysis**: Backend analyzes tags and generates recommendations
7. **Storage**: Results are saved to database/memory for caching
8. **Response**: Analysis data returned to frontend
9. **UI Update**: Frontend displays results in organized component sections

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI primitives + shadcn/ui components
- **Styling**: Tailwind CSS with PostCSS processing

### Backend Dependencies
- **Server**: Express.js with TypeScript support via tsx
- **Database**: Drizzle ORM with Neon Database serverless driver
- **Web Scraping**: Axios for HTTP requests, Cheerio for HTML parsing
- **Validation**: Zod for schema validation

### Development Tools
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (implied by project structure)
- **Development**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: tsx with watch mode for automatic restart
- **Database**: Environment variable configuration for DATABASE_URL
- **Replit Integration**: Cartographer plugin for enhanced debugging

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Serving**: Express serves both API routes and static frontend assets
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: NODE_ENV=development with full dev tooling
- **Production**: NODE_ENV=production with optimized builds
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Management**: PostgreSQL session store with connect-pg-simple

The application is designed to be deployed on Replit with seamless development-to-production workflow, featuring automatic builds and environment-specific optimizations.