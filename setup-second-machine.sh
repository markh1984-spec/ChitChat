#!/bin/bash

# ChitChat - Second Machine Setup
# Run this script on your other MacBook to pick up the project

set -e

echo "🚀 ChitChat - Second Machine Setup"
echo ""

# Check if ChitChat directory already exists
if [ -d "~/ChitChat" ]; then
  echo "⚠️  ChitChat directory already exists. Please remove it or choose a different location."
  exit 1
fi

echo "📥 Step 1: Cloning repository..."
git clone https://github.com/markh1984/ChitChat.git
cd ChitChat

echo ""
echo "📦 Step 2: Installing dependencies..."
npm install

echo ""
echo "🔧 Step 3: Setting up environment..."
if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "⚠️  Created .env.local - you'll need to add your credentials"
else
  echo "✅ .env.local already exists"
fi

echo ""
echo "🌐 Step 4: Linking to Vercel..."
echo "Run: vercel link"
echo "Select the existing ChitChat project when prompted"

echo ""
echo "✅ Setup complete on second machine!"
echo ""
echo "Before starting development:"
echo "  1. Edit .env.local with your database credentials"
echo "  2. Run: vercel link (select existing project)"
echo "  3. Run: vercel env pull (download env vars from Vercel)"
echo "  4. Run: npx prisma generate"
echo "  5. Run: npm run dev"
echo ""
echo "📖 Check TODO.md for current priorities"
echo "📊 Check PROJECT_STATUS.md for latest status"
