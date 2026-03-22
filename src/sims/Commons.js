// Commons simulation — Logistic growth fish population model

export const MODERATE = 'moderate';
export const OVERFISH = 'overfish';

// Default parameters
export const DEFAULT_PARAMS = {
  K: 100,           // Carrying capacity
  r: 0.3,           // Growth rate
  moderateCatch: 3,  // Fish per moderate harvest
  overfishCatch: 6,  // Fish per overfish harvest
  baseCost: 2,       // Fixed cost per round
  basePrice: 1,      // Base price per fish
  scarcityBonus: 0.5, // Price increase as fish decrease
  collapseThreshold: 5, // Below this, fishery collapses
};

// Calculate fish regeneration (logistic growth)
export function regenerate(population, K = DEFAULT_PARAMS.K, r = DEFAULT_PARAMS.r) {
  if (population <= 0) return 0;
  const growth = r * population * (1 - population / K);
  return Math.max(0, Math.round(population + growth));
}

// Calculate price per fish based on scarcity
export function fishPrice(population, K = DEFAULT_PARAMS.K) {
  const { basePrice, scarcityBonus } = DEFAULT_PARAMS;
  return basePrice * (1 + scarcityBonus * (1 - population / K));
}

// Calculate profit for a single catch
export function calcProfit(catchAmount, population, K = DEFAULT_PARAMS.K) {
  const price = fishPrice(population, K);
  return Math.round((catchAmount * price - DEFAULT_PARAMS.baseCost) * 10) / 10;
}

// Run one round of the commons game
export function runRound(population, decisions, params = DEFAULT_PARAMS) {
  const totalCatch = decisions.reduce((sum, d) => {
    return sum + (d === OVERFISH ? params.overfishCatch : params.moderateCatch);
  }, 0);

  const actualTotalCatch = Math.min(totalCatch, population);
  const ratio = actualTotalCatch / totalCatch;

  const results = decisions.map(d => {
    const intended = d === OVERFISH ? params.overfishCatch : params.moderateCatch;
    const actual = Math.round(intended * ratio);
    const price = fishPrice(population, params.K);
    const profit = Math.round((actual * price - params.baseCost) * 10) / 10;
    return { decision: d, intended, actual, profit, price };
  });

  const remaining = Math.max(0, population - actualTotalCatch);
  const newPopulation = regenerate(remaining, params.K, params.r);
  const collapsed = newPopulation <= params.collapseThreshold;

  return {
    results,
    totalCatch: actualTotalCatch,
    remaining,
    newPopulation,
    collapsed,
  };
}

// Run a multi-round match between strategies
export function runMatch(strategyA, strategyB, rounds = 10, params = DEFAULT_PARAMS) {
  let population = params.K * 0.4; // Start at 40% capacity
  let historyA = [];
  let historyB = [];
  let scoreA = 0;
  let scoreB = 0;
  const history = [];

  for (let i = 0; i < rounds; i++) {
    if (population <= params.collapseThreshold) break;

    const decA = strategyA.play(historyA, historyB, population, params);
    const decB = strategyB.play(historyB, historyA, population, params);

    const round = runRound(population, [decA, decB], params);

    scoreA += round.results[0].profit;
    scoreB += round.results[1].profit;
    historyA.push(decA);
    historyB.push(decB);
    population = round.newPopulation;

    history.push({
      round: i + 1,
      population,
      decisions: [decA, decB],
      profits: [round.results[0].profit, round.results[1].profit],
    });
  }

  return {
    scoreA: Math.round(scoreA * 10) / 10,
    scoreB: Math.round(scoreB * 10) / 10,
    history,
    finalPopulation: population,
  };
}

// Run a tournament (all vs all)
export function runTournament(strategies, rounds = 10, params = DEFAULT_PARAMS) {
  const n = strategies.length;
  const scores = new Array(n).fill(0);
  const matchResults = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const result = runMatch(strategies[i], strategies[j], rounds, params);
      scores[i] += result.scoreA;
      scores[j] += result.scoreB;
      matchResults.push({
        a: i, b: j,
        scoreA: result.scoreA,
        scoreB: result.scoreB,
        history: result.history,
      });
    }
  }

  return {
    scores: scores.map(s => Math.round(s * 10) / 10),
    matchResults,
    ranking: scores.map((s, i) => ({ index: i, score: s, name: strategies[i].name }))
      .sort((a, b) => b.score - a.score),
  };
}

// Run evolution simulation
export function runEvolution(strategies, populationCounts, generations = 20, rounds = 10, params = DEFAULT_PARAMS) {
  const history = [populationCounts.map(c => c)];

  let counts = [...populationCounts];

  for (let gen = 0; gen < generations; gen++) {
    // Build player list
    const players = [];
    counts.forEach((count, si) => {
      for (let i = 0; i < count; i++) {
        players.push({ strategyIndex: si, score: 0 });
      }
    });

    if (players.length < 2) break;

    // Round-robin matches
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const result = runMatch(
          strategies[players[i].strategyIndex],
          strategies[players[j].strategyIndex],
          rounds, params
        );
        players[i].score += result.scoreA;
        players[j].score += result.scoreB;
      }
    }

    // Sort by score
    players.sort((a, b) => a.score - b.score);

    // Eliminate bottom 5 (or 20%)
    const eliminateCount = Math.max(1, Math.floor(players.length * 0.2));
    const eliminated = players.slice(0, eliminateCount);
    const survivors = players.slice(eliminateCount);
    const top = players.slice(-eliminateCount);

    // Reproduce top performers
    const newPlayers = [...survivors];
    top.forEach(p => newPlayers.push({ ...p, score: 0 }));

    // Recount
    counts = new Array(strategies.length).fill(0);
    newPlayers.forEach(p => counts[p.strategyIndex]++);

    history.push([...counts]);
  }

  return { history, finalCounts: counts };
}
