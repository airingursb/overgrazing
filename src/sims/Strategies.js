// Fishing strategies — each is a { name, icon, color, description, play() } object
import { MODERATE, OVERFISH, DEFAULT_PARAMS } from './Commons.js';
import { t } from '../core/I18n.js';

// Always overfishes
export const Greedy = {
  get name() { return t('strategy.greedy.name'); },
  icon: '🟥',
  emoji: '🦈',
  color: '#e74c3c',
  get description() { return t('strategy.greedy.desc'); },
  play() {
    return OVERFISH;
  },
};

// Always moderate
export const Moderate = {
  get name() { return t('strategy.moderate.name'); },
  icon: '🟩',
  emoji: '🌿',
  color: '#27ae60',
  get description() { return t('strategy.moderate.desc'); },
  play() {
    return MODERATE;
  },
};

// Tit-for-tat: copies the average of others' last round
export const Copyfish = {
  get name() { return t('strategy.copyfish.name'); },
  icon: '🟦',
  emoji: '🪞',
  color: '#3498db',
  get description() { return t('strategy.copyfish.desc'); },
  play(myHistory, theirHistory) {
    if (theirHistory.length === 0) return MODERATE;
    return theirHistory[theirHistory.length - 1];
  },
};

// Cooperates until betrayed, then always defects
export const Grudger = {
  get name() { return t('strategy.grudger.name'); },
  icon: '🟨',
  emoji: '😤',
  color: '#f39c12',
  get description() { return t('strategy.grudger.desc'); },
  play(myHistory, theirHistory) {
    if (theirHistory.includes(OVERFISH)) return OVERFISH;
    return MODERATE;
  },
};

// Probes then decides
export const Detective = {
  get name() { return t('strategy.detective.name'); },
  icon: '🟫',
  emoji: '🔍',
  color: '#8e6e53',
  get description() { return t('strategy.detective.desc'); },
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
  get name() { return t('strategy.forgiving.name'); },
  icon: '🟪',
  emoji: '😺',
  color: '#9b59b6',
  get description() { return t('strategy.forgiving.desc'); },
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
  get name() { return t('strategy.simpleton.name'); },
  icon: '⬜',
  emoji: '🎲',
  color: '#bdc3c7',
  get description() { return t('strategy.simpleton.desc'); },
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
  get name() { return t('strategy.random.name'); },
  icon: '🎲',
  emoji: '❓',
  color: '#1abc9c',
  get description() { return t('strategy.random.desc'); },
  play() {
    return Math.random() < 0.5 ? MODERATE : OVERFISH;
  },
};

// Guardian — adjusts based on fish population
export const Guardian = {
  get name() { return t('strategy.guardian.name'); },
  icon: '🟠',
  emoji: '🛡️',
  color: '#e67e22',
  get description() { return t('strategy.guardian.desc'); },
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
