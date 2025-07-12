# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite implementation of "Fake Artist Goes to Oslo", a party game where players draw while one player is the "fake artist" who doesn't know what they're supposed to draw. The interface is in Norwegian.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview the production build locally

## Project Architecture

### Game Flow
The game follows this state flow:
1. **Setup Phase**: Player count selection (5-10 players)
2. **Reveal Phase**: Each player individually sees their word/role
3. **Drawing Phase**: All players draw together

### Key Components

- **App.tsx**: Main application orchestrator managing game state and word data loading
- **GameSetup.tsx**: Initial screen for selecting number of players
- **PlayerReveal.tsx**: Individual player screens showing word/role
- **GameStart.tsx**: Final drawing phase screen

### Core Game Logic

- **gameLogic.ts**: Contains game initialization and player info logic
- **types.ts**: TypeScript interfaces for game state and word data
- Random fake artist selection and word/category selection from YAML data

### Word Data System

Game words are loaded from `/public/words.yaml` which contains Norwegian words organized by categories:
- `dyr` (animals)
- `ting` (things/objects) 
- `aktiviteter` (activities)
- `steder` (places)

The YAML is loaded asynchronously using js-yaml library at app startup.

## File Structure Notes

- All game logic is centralized in `gameLogic.ts`
- Component styling uses individual CSS files
- Game state flows through React props (no external state management)
- Public assets include PWA manifest and word data file