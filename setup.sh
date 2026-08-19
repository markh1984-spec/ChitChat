#!/bin/bash

# ChitChat Setup Script
# Run this to complete the initial setup

set -e

echo "🚀 ChitChat Setup Starting..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Not in ChitChat directory. Run from ~/ChitChat"
  exit 1
fi

echo ""
echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔧 Step 2: Setting up git..."
if [ ! -d ".git" ]; then
  git init
  git remote add origin https://github.com/markh1984/ChitChat.git
  echo "✅ Git initialized and remote added"
else
  echo "✅ Git already initialized"
fi

echo ""
echo "📝 Step 3: Creating initial commit..."
git add .
git commit -m "Initial ChitChat setup

- Next.js 15 with App Router
- TypeScript configuration
- Tailwind CSS with accessibility enhancements
- Prisma schema for users, interests, and matches
- Basic interest-based matching algorithm
- Landing page
- Project tracking (TODO.md, PROJECT_STATUS.md)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "🌍 Step 4: Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Install Vercel CLI: npm install -g vercel"
echo "  2. Link to Vercel: vercel link"
echo "  3. Set up database: Create Postgres database in Vercel dashboard"
echo "  4. Add environment variables to Vercel"
echo "  5. Deploy: npm run deploy"
echo ""
echo "To start development server: npm run dev"
