# ChitChat - Project Status

**Last Updated:** 2026-08-19

## 📊 Current Status: Working Prototype Ready for Demo ✅

### What's Working
- ✅ Marketing/"leaflet" landing page (`app/page.tsx`) explaining the project, problem, roadmap
- ✅ Interactive working demo at `/demo` (`app/demo/page.tsx`): profile setup → interest
  picking → per-user Location/Interests priority slider → live-ranked match list
- ✅ Matching combines two axes — shared interests (`lib/matching.ts`) and mock distance
  (`lib/discover.ts`) — blended by a slider that's meant to represent a per-account setting
- ✅ 10 mock neighbour profiles (`lib/mockUsers.ts`) so the demo needs no backend/database
- ✅ Accessibility-first styling throughout: 18px+ base text, large touch targets, high
  contrast, minimal steps per screen
- ✅ Verified working in both desktop and mobile viewports

### Deliberately Out of Scope for This Prototype
- No real database/auth — everything runs client-side with mock data so the demo is
  reliable without any setup. Prisma schema and NextAuth are still present as the
  intended production architecture, just not wired up yet.
- No real chat — the "Say Hello" button is a lightweight stand-in for messaging
- No real geolocation — distances are static mock values per profile

### To Run Locally
```bash
npm install --legacy-peer-deps   # React 19 + Next 15 peer range needs this flag
npm run dev
```
Then visit `/` for the leaflet page and `/demo` for the interactive prototype.

### Known Environment Issue
`.git` in this directory is incomplete (missing config/objects) — git commands fail here.
Re-run `git init` and reconnect the remote before trying to commit or push.

### Next Steps Towards a Real Product
1. Fix/re-init git and push to GitHub
2. Wire up Prisma + Postgres and replace mock data with real user records
3. Add NextAuth sign-in
4. Real chat/messaging once two users match
5. Deploy to Vercel

### Architecture Decisions
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS for responsive, accessible design
- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **Hosting:** Vercel
- **Matching Logic:** Interest-based scoring algorithm (to be designed)

### Multi-Machine Setup Notes
- All dependencies and versions locked in package.json
- Git repo: https://github.com/markh1984/ChitChat.git
- Run `npm install` on new machine
- Run `vercel link` to connect to Vercel project
- Requires Vercel CLI: `npm install -g vercel`
- Check TODO.md for current task status
- Always pull latest before starting work
- Push frequently to keep headroom low

### Environment Variables Needed (Later)
- `DATABASE_URL` - Vercel Postgres connection string
- `NEXTAUTH_SECRET` - Auth secret key
- `NEXTAUTH_URL` - App URL for NextAuth callbacks
