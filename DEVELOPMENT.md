# ChitChat Development Quick Reference

## Initial Setup (This Machine)

```bash
cd ~/ChitChat
./setup.sh
```

This will:
- Install all npm dependencies
- Initialize git and connect to GitHub
- Create initial commit and push to main

After setup.sh completes:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Link to your Vercel account and create project
vercel link

# Deploy!
npm run deploy
```

## Setting Up Second MacBook

On your other MacBook, run:

```bash
cd ~ && curl -O https://raw.githubusercontent.com/markh1984/ChitChat/main/setup-second-machine.sh
chmod +x setup-second-machine.sh
./setup-second-machine.sh
```

Or manually:

```bash
git clone https://github.com/markh1984/ChitChat.git
cd ChitChat
npm install
vercel link  # Select existing project
vercel env pull  # Download environment variables
npm run dev
```

## Daily Development Workflow

### Starting Work
```bash
cd ~/ChitChat
git pull  # Get latest changes
npm run dev  # Start development server at http://localhost:3000
```

### Making Changes
1. Check `TODO.md` for priorities
2. Make your changes
3. Test locally at http://localhost:3000

### Deploying
```bash
# Quick deploy with auto-generated message
./deploy.sh

# Or with custom commit message
./deploy.sh "Add user profile page"
```

This will:
- Commit your changes to git
- Push to GitHub
- Deploy to Vercel production

## Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run deploy       # Deploy to Vercel

npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Create and run migration
npx prisma studio    # Open database GUI
```

## Important Files

- **TODO.md** - Current development tasks
- **PROJECT_STATUS.md** - Project state, updated after major changes
- **.env.local** - Local environment variables (not in git)
- **prisma/schema.prisma** - Database schema

## Vercel Setup

1. Create Postgres database in Vercel dashboard
2. Add environment variables in Vercel:
   - `DATABASE_URL` (auto-added with Postgres)
   - `NEXTAUTH_SECRET` (generate with: openssl rand -base64 32)
   - `NEXTAUTH_URL` (your production URL)

## Multi-Machine Tips

- Always `git pull` before starting work
- Push frequently (keep headroom low)
- Update PROJECT_STATUS.md after major changes
- The deploy.sh script handles commit + push + deploy in one command

## Database Migrations

When you change prisma/schema.prisma:

```bash
npx prisma migrate dev --name description_of_change
git add prisma/migrations
git commit -m "Add migration: description_of_change"
git push
```

Vercel will automatically run migrations on deploy.
