# Proposal Studio

A proposal generator: build a client proposal (basic info, project sections, dynamic pricing), preview it live as a polished document, save it, and export it as a PDF.

## Stack

- **Frontend:** Vite + React + TypeScript + Tailwind CSS, in `frontend/`
- **Backend:** Node.js + Express + Prisma + SQLite, in `backend/`

See `plan.txt` for the original requirements and the plan file used to build this out for the full architecture writeup.

## Running locally

Two terminals, one per package:

```bash
# Terminal 1 — backend (http://localhost:4000)
cd backend
npm install
npx prisma migrate dev   # first time only, creates dev.db
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api/*` to the backend on port 4000.

## Using the app

1. **Dashboard** (`/`) — lists proposals, with search, status filter, and create/rename/duplicate/delete actions.
2. **New Proposal** (`/proposals/new`) — enter a title and client name to create a draft.
3. **Editor** (`/proposals/:id/edit`) — three-pane document builder:
   - Left: section navigator (reorder with the up/down arrows, toggle visibility with the eye icon, green dot = has content).
   - Center: the form for whichever section is selected (Basic Info, Branding, and each proposal section).
   - Right: a live preview of the document, updating as you type.
4. **Save** persists to the database; the header shows Saved / Unsaved changes / Saving… / Save failed.
5. **Export PDF** saves first, then opens the browser's print dialog against the live preview — choose "Save as PDF" there.

## Notes

- Single-user app — no login/accounts.
- Pricing totals (subtotal/discount/tax/total) are always recomputed server-side on save from the line items, never trusted from the client.
- Section forms follow a small registry (`frontend/src/sections/sectionRegistry.ts`) so a new section type is one registry entry plus one Edit/Preview component pair, not a rewrite of the sidebar/preview/completion logic.
