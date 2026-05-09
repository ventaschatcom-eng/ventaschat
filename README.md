# VentasChat

VentasChat is a SaaS MVP that helps sellers, freelancers, agencies, and small businesses analyze WhatsApp conversations and understand how to close more sales.

## Stack

- Next.js App Router
- NextAuth credentials authentication
- Direct SQLite storage for the local MVP
- OpenAI for conversation analysis with a built-in fallback when no API key is configured

## Setup

1. Copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `npm run dev`.

## Included MVP

- Landing page
- Pricing page
- Sign up / log in
- User dashboard
- Remaining credits
- Conversation analyzer
- Structured analysis results
- Analysis history
- Billing and settings placeholders
- Credit-pack-first pricing presentation
- Conversion score explanation in the analysis output

## Notes

- New users start on the `free` plan with `3` credits.
- If `OPENAI_API_KEY` is not configured, the app returns a fallback sales analysis so the product flow still works locally.
- The local app stores data in `data/ventaschat.db`.
