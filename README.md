# ChitChat 💬

A social connection platform designed for older adults to find and connect with people who share similar interests.

## Overview

ChitChat helps combat loneliness by matching users based on shared interests, hobbies, and preferences - similar to how dating apps work, but focused purely on friendship and social connection.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Hosting:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel CLI: `npm install -g vercel`

### Installation

```bash
# Clone the repository
git clone https://github.com/markh1984/ChitChat.git
cd ChitChat

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database and auth credentials

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

```bash
# Deploy to Vercel
npm run deploy
```

Or push to main branch for automatic deployment via Vercel GitHub integration.

## Project Structure

```
chitchat/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utility functions and configs
├── prisma/          # Database schema and migrations
├── public/          # Static assets
├── TODO.md          # Development task tracking
└── PROJECT_STATUS.md # Current project status
```

## Development Workflow

1. Check `TODO.md` for current priorities
2. Update `PROJECT_STATUS.md` after significant changes
3. Push frequently to maintain low headroom
4. Deploy often with `npm run deploy`

## Design Principles

- **Accessibility First:** Large text, high contrast, clear navigation
- **Simplicity:** Minimal steps, intuitive flows
- **Safety:** Moderation tools, block/report functionality
- **Privacy:** User control over profile visibility and data

## Contributing

This is currently a private project. For questions or access, contact the maintainer.

## License

Private - All Rights Reserved
