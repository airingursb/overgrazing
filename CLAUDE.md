# The Evolution of the Commons (公地的进化)

An interactive explorable explanation about the Tragedy of the Commons, inspired by Nicky Case's [The Evolution of Trust](https://ncase.me/trust/).

## Project Overview
- **Type**: Interactive web game / explorable explanation
- **Duration**: ~20-25 minutes gameplay
- **Theme**: Tragedy of the Commons — why shared resources get destroyed, and how to save them
- **Style**: Warm, hand-drawn, character-driven (ocean/fishing theme)
- **Reference**: https://ncase.me/trust/ (CC0 licensed, assets can be reused)
- **Linear Project**: Trust (MoFlow Team)

## Agent Team
Agent role definitions are in `.claude/agents/`:
- **PM** (`pm.md`) — Product vision, specs, Linear issues
- **Architect** (`architect.md`) — Tech architecture, project structure
- **Designer** (`designer.md`) — Visual design, interaction patterns
- **Game Designer** (`game-designer.md`) — Game mechanics, narrative, simulation models
- **Developer** (`developer.md`) — Frontend implementation
- **Tester** (`tester.md`) — QA via browser automation (Playwright MCP)

## Tech Stack
- PIXI.js (2D rendering) + HTML (text content)
- Vite (build tool)
- Howler.js (audio)
- GSAP or Tween.js (animation)
- Vanilla JavaScript (ES modules)

## Key Design Principles
1. One concept per section
2. Progressive disclosure (concrete → abstract → sandbox)
3. Alternate: read → play → observe → tweak
4. Characters make concepts lovable
5. End with empowerment (sandbox mode)
6. "BUT" transitions create narrative momentum

## Development Workflow
1. PM brainstorms and writes specs → Linear
2. Architect designs structure
3. Game Designer defines mechanics and narrative
4. Developer implements
5. Tester validates via browser
6. Iterate
