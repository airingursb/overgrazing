# 🐟 The Evolution of the Commons（公地的进化）

An interactive explorable explanation about the **Tragedy of the Commons** — why shared resources get destroyed, and how to save them.

Inspired by Nicky Case's [The Evolution of Trust](https://ncase.me/trust/).

▶️ **[Play Online](https://airingursb.github.io/overgrazing/)**

![License](https://img.shields.io/badge/license-CC0--1.0-blue)

## About

Through an ocean fishing metaphor, this ~20 minute interactive experience guides you through:

- **Prologue** — The real-world tragedy: how shared resources collapse
- **Chapter 1–2** — The Prisoner's Dilemma of the commons: cooperate or overfish?
- **Chapter 3–4** — Tournament of strategies: who wins when everyone competes?
- **Chapter 5–6** — Evolution & noise: how mistakes change everything
- **Chapter 7** — Elinor Ostrom's 8 principles for governing the commons
- **Sandbox** — Build your own commons: tweak strategies, rules, and watch what happens

Each section alternates between **reading → playing → observing → tweaking**, so you learn by doing.

## Strategies

The game features 9 fishing strategies, each representing a different approach to shared resources:

| Strategy | Behavior |
|----------|----------|
| 🟢 Cooperator | Always fishes sustainably |
| 🔴 Greedy | Always overfishes |
| 🔁 Copycat (Tit-for-Tat) | Copies what the majority did last round |
| 😤 Grudger | Cooperates until betrayed, then never forgives |
| 🎲 Random | Randomly cooperates or overfishes |
| 🕵️ Detective | Tests the waters, then exploits or cooperates |
| 🤝 Generous | Like Copycat, but occasionally forgives |
| 📊 Majority | Follows whatever the majority does |
| 🌱 Ostrom | Cooperates and punishes overfishers (institutional approach) |

## Tech Stack

- **Vanilla JavaScript** (ES modules, zero framework)
- **Vite** — Build tool & dev server
- **Web Audio API** — Procedural ambient BGM & click SFX (no audio files)
- **Canvas API** — Charts, scratch cards, evolution visualizations
- **CSS** — Animations, responsive layout, hand-drawn aesthetic

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Features

- 🌐 **Bilingual** — Full English / 中文 support, switchable in-game
- 🔊 **Procedural Audio** — Ocean-ambient BGM generated via Web Audio API
- 📱 **Responsive** — Works on desktop and mobile
- 🎮 **Interactive Simulations** — Play the commons dilemma yourself
- 🧪 **Sandbox Mode** — Customize strategies, pond size, rounds, and observe emergent behavior
- ♿ **No Dependencies** — Pure vanilla JS, ~zero external runtime deps

## Project Structure

```
src/
├── core/           # Engine modules
│   ├── Slideshow.js    # Slide engine with lifecycle hooks
│   ├── PubSub.js       # Event system
│   ├── I18n.js         # Translations (EN/ZH)
│   ├── Audio.js        # Web Audio BGM & SFX
│   ├── Chart.js        # Canvas chart renderer
│   ├── Scratch.js      # Scratch card interaction
│   └── UI.js           # Shared UI components (pond, boats)
├── sims/           # Simulation logic
│   ├── Commons.js      # Commons game engine
│   └── Strategies.js   # 9 fishing strategies
├── slides/         # Content (one file per act)
│   ├── Cover.js
│   ├── Act0.js – Act9.js
├── main.js         # Entry point
└── style.css       # All styles
```

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) — Public Domain.

## Credits

- Concept inspired by [The Evolution of Trust](https://ncase.me/trust/) by Nicky Case
- Built with ❤️ by [Airing](https://ursb.me)
