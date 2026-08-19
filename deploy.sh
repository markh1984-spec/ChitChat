#!/bin/bash

# Quick deployment script
# Usage: ./deploy.sh [message]

set -e

MESSAGE="${1:-Quick update}"

echo "🚀 ChitChat Deployment"
echo ""
echo "📝 Committing changes..."
git add .
git commit -m "$MESSAGE

Co-Authored-By: Claude <noreply@anthropic.com>" || echo "No changes to commit"

echo ""
echo "⬆️  Pushing to GitHub..."
git push

echo ""
echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
