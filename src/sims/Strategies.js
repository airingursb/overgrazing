// Fishing strategies — each is a { name, icon, color, description, play() } object
import { MODERATE, OVERFISH, DEFAULT_PARAMS } from './Commons.js';

// Always overfishes
export const Greedy = {
  name: '贪婪号',
  icon: '🟥',
  emoji: '🦈',
  color: '#e74c3c',
  description: '每轮都过度捕捞，不管鱼群状态',
  play() {
    return OVERFISH;
  },
};

// Always moderate
export const Moderate = {
  name: '节制号',
  icon: '🟩',
  emoji: '🌿',
  color: '#27ae60',
  description: '每轮只捕安全量，永远不多捕',
  play() {
    return MODERATE;
  },
};

// Tit-for-tat: copies the average of others' last round
export const Copyfish = {
  name: '模仿号',
  icon: '🟦',
  emoji: '🪞',
  color: '#3498db',
  description: '第一轮节制，之后模仿对手上一轮的选择',
  play(myHistory, theirHistory) {
    if (theirHistory.length === 0) return MODERATE;
    return theirHistory[theirHistory.length - 1];
  },
};

// Cooperates until betrayed, then always defects
export const Grudger = {
  name: '记仇号',
  icon: '🟨',
  emoji: '😤',
  color: '#f39c12',
  description: '节制捕捞，但一旦对方过度捕捞就永远过度',
  play(myHistory, theirHistory) {
    if (theirHistory.includes(OVERFISH)) return OVERFISH;
    return MODERATE;
  },
};

// Probes then decides
export const Detective = {
  name: '侦探号',
  icon: '🟫',
  emoji: '🔍',
  color: '#8e6e53',
  description: '前4轮试探，如果对方从未报复则一直过度',
  play(myHistory, theirHistory) {
    // Fixed opening: moderate, overfish, moderate, moderate
    const opening = [MODERATE, OVERFISH, MODERATE, MODERATE];
    if (myHistory.length < 4) return opening[myHistory.length];

    // If opponent never retaliated during probe, exploit
    const probePhase = theirHistory.slice(0, 4);
    if (!probePhase.includes(OVERFISH)) return OVERFISH;

    // Otherwise, play copyfish
    return theirHistory[theirHistory.length - 1];
  },
};

// Tit-for-two-tats: forgives one defection
export const Forgiving = {
  name: '宽容号',
  icon: '🟪',
  emoji: '😺',
  color: '#9b59b6',
  description: '类似模仿号，但容忍一次过度捕捞才报复',
  play(myHistory, theirHistory) {
    if (theirHistory.length < 2) return MODERATE;
    // Only retaliate if opponent overfished twice in a row
    if (theirHistory[theirHistory.length - 1] === OVERFISH &&
        theirHistory[theirHistory.length - 2] === OVERFISH) {
      return OVERFISH;
    }
    return MODERATE;
  },
};

// Win-Stay Lose-Shift
export const Simpleton = {
  name: '憨憨号',
  icon: '⬜',
  emoji: '🎲',
  color: '#bdc3c7',
  description: '上轮赚了就重复，亏了就换策略',
  play(myHistory, theirHistory, population, params = DEFAULT_PARAMS) {
    if (myHistory.length === 0) return MODERATE;

    // Check if last round was "good" (opponent cooperated)
    const lastTheir = theirHistory[theirHistory.length - 1];
    const lastMine = myHistory[myHistory.length - 1];

    // If we cooperated and they cooperated, keep cooperating
    // If we defected and they cooperated, keep defecting
    // If we cooperated and they defected, switch to defecting
    // If we defected and they defected, switch to cooperating
    if (lastTheir === MODERATE) return lastMine;
    return lastMine === MODERATE ? OVERFISH : MODERATE;
  },
};

// Random
export const Random = {
  name: '随机号',
  icon: '🎲',
  emoji: '❓',
  color: '#1abc9c',
  description: '随机决定捕捞量',
  play() {
    return Math.random() < 0.5 ? MODERATE : OVERFISH;
  },
};

// Guardian — adjusts based on fish population
export const Guardian = {
  name: '守护号',
  icon: '🟠',
  emoji: '🛡️',
  color: '#e67e22',
  description: '根据鱼群状态动态调整：鱼多正常捕、鱼少减少、危险停捕',
  play(myHistory, theirHistory, population, params = DEFAULT_PARAMS) {
    const ratio = population / params.K;
    if (ratio > 0.5) return MODERATE; // Healthy: fish moderately
    if (ratio > 0.3) return MODERATE; // Warning: still moderate
    return MODERATE; // Critical: still moderate (guardian never overfishes)
  },
};

// All strategies for easy access
export const ALL_STRATEGIES = [
  Greedy, Moderate, Copyfish, Grudger, Detective,
  Forgiving, Simpleton, Random, Guardian,
];

// Core strategies for early acts
export const CORE_STRATEGIES = [
  Moderate, Greedy, Copyfish, Grudger, Detective,
];

// Extended strategies (added in Act 6)
export const EXTENDED_STRATEGIES = [
  Moderate, Greedy, Copyfish, Grudger, Detective,
  Forgiving, Simpleton, Random,
];
