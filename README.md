# 🔞 18+ Tic Tac Toe

**A seductive twist on a classic game.**

<br />

## 🧿 Overview

18+ Tic Tac Toe is a fun, adult-themed take on the classic game, wrapped in a dark and moody aesthetic. It features floating animations, glowing UI elements, custom horror-inspired typography, and a progressively challenging board that grows with each level. Built entirely from scratch with React 19 and TypeScript, this project was a playground for experimenting with CSS-in-JS animations, game AI logic, and creative frontend design.

<br />

## ✨ Key Features

- **Single Player vs AI** with smart move logic (win detection, blocking, strategic positioning)
- **Two Player Mode** for local head-to-head matches
- **Dynamic Board Scaling** that increases the grid size every time you win
- **Floating Animations** using CSS keyframe animations (float, glow pulse, fade-in)
- **Typewriter Text Effect** with per-character animation delays
- **Dark Aesthetic** with layered gradient overlays on a graveyard background
- **Custom Google Fonts** (Nosifer, Creepster) loaded at runtime
- **Sound Effects** triggered on win via Howler.js
- **Tie Detection** with automatic board reset
- **Fully Responsive** and production-built with Vite

<br />

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Howler.js](https://img.shields.io/badge/Howler.js-2.2-FF6600?style=for-the-badge&logo=audio&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

<br />

## 🧠 Technical Highlights

- **AI Opponent** built from scratch with a priority-based decision engine: check for winning move → block opponent → take center → grab a corner → fallback to random
- **Dynamic Win Calculation** that generates all valid rows, columns, and diagonals for any N×N board size at runtime
- **CSS-in-JS Animations** using `styled-components` keyframes for floating, glowing, fading, and typewriter effects
- **Audio Management** with `useRef` to avoid re-instantiating Howl on every render, with graceful error handling for missing assets
- **State Architecture** using a clean enum-based game state machine (`SelectMode → ShowMessage → Playing`) to manage UI flow
- **Strict TypeScript** with `noUnusedLocals`, `noUnusedParameters`, and full type safety across all components

<br />

## 📚 What I Learned

- How to build a scalable game loop in React using hooks (`useState`, `useEffect`, `useRef`, `useCallback`) without external state libraries
- The importance of dependency arrays in `useEffect` and how stale closures can silently break game logic
- Managing audio in React (creating instances once, cleaning up on unmount, handling load failures)
- Generating dynamic CSS grid layouts based on runtime state
- Designing a themed UI from scratch using only `styled-components` with no component library

<br />

## 🚀 Getting Started

```bash
git clone git@github.com:BigBangZeus/18-Tic-Tac-Toe.git
cd 18-Tic-Tac-Toe
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to play.

<br />

## 📁 Project Structure

```
src/
├── App.tsx              # Global styles, font loading, app shell
├── main.tsx             # React entry point
├── components/
│   ├── Game.tsx         # Core game logic, AI, state machine, UI
│   ├── Board.tsx        # Dynamic N×N grid renderer
│   └── Square.tsx       # Individual cell with animated X/O
public/
├── assets/
│   ├── images/          # Background and character art
│   └── sounds/          # Win sound effect
```

<br />

---

> ⚠️ **Note:** This is a novelty 18+ themed project built for fun and portfolio purposes. All content is tasteful and intended as creative expression. No explicit material is included.
