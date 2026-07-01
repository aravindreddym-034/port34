# Aravind Reddy — Data Analyst Portfolio

## Problem Statement
Build a premium, award-winning personal portfolio for a Data Analyst (Aravind Reddy M). Dark theme with cyan/purple/blue accents, heavy 3D animations (Three.js/R3F), glassmorphism, floating particles, cursor effects, typing animation.

## Persona
Aravind Reddy M — student pursuing Bachelor's, aspiring Data Analyst targeting recruiters at Deloitte, Accenture, PwC, EY, KPMG, Amazon, Microsoft, Google.

## Core Requirements
- Hero with anime avatar, typing effect, particle field, CTAs
- About "Who Am I?" with quote + stats counters
- Skills grid (8 groups) with rotating 3D wireframe sphere background
- Learning & Growth Journey timeline
- Projects (6 sample cards, bento grid)
- Certifications + "What I'm Learning" marquee
- Contact form (working, stores in MongoDB) + email/LinkedIn/GitHub links
- Custom cursor, smooth scroll, responsive

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + @react-three/fiber v9 + @react-three/drei v10 + react-fast-marquee + sonner
- Backend: FastAPI + Motor(MongoDB) with /api/contact POST + GET
- Data file: /app/frontend/src/data/portfolio.js (all content easily editable)

## Implemented (Dec 2025)
- All 8 portfolio sections
- Working contact form with backend persistence
- 3D particle field + skill sphere
- Typing animation, counter animation, timeline animation
- Custom cursor with hover states
- Full responsive layout

## Backlog / Next Actions
- P1: Real project GitHub/demo URLs when built
- P1: Upload real anime avatar (currently Unsplash placeholder)
- P1: Add real resume PDF download
- P2: Add project detail modals / dedicated pages
- P2: Blog section for case studies
- P2: SEO meta tags + Open Graph
- P2: Send email notification on new contact submission (Resend integration)
