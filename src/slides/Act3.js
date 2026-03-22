// ACT 3: 渔场锦标赛 — 策略对抗
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';
import { runTournament, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createBarChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

// Slide: Bet and tournament
export const Act3_Tournament = {
  id: 'act3-tournament',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act3.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act3.intro')), 400);

    appendAnimated(content, text(t('act3.bet')), 800);

    // Betting
    const betArea = document.createElement('div');
    betArea.className = 'bet-options';
    let selectedBet = null;

    CORE_STRATEGIES.forEach(s => {
      const opt = document.createElement('div');
      opt.className = 'bet-option';
      opt.innerHTML = `${s.emoji} ${s.name}`;
      opt.style.borderColor = s.color + '40';
      opt.addEventListener('click', () => {
        betArea.querySelectorAll('.bet-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.style.borderColor = s.color;
        selectedBet = s.name;
        startBtn.style.display = 'inline-flex';
      });
      betArea.appendChild(opt);
    });
    appendAnimated(content, betArea, 1200);

    const startBtn = button(t('act3.start'), 'btn-primary', () => runTournamentAnim());
    startBtn.style.display = 'none';
    appendAnimated(content, startBtn, 1400);

    const resultArea = document.createElement('div');
    resultArea.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:16px;align-items:center;';
    content.appendChild(resultArea);

    const runTournamentAnim = () => {
      startBtn.style.display = 'none';
      betArea.style.pointerEvents = 'none';
      betArea.style.opacity = '0.5';

      // Run tournament
      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      const result = runTournament(CORE_STRATEGIES, 10, params);

      appendAnimated(resultArea, text(t('act3.running')), 0);

      setTimeout(() => {
        resultArea.innerHTML = '';

        // Show bar chart
        const bars = createBarChart(
          result.ranking.map(r => ({
            name: CORE_STRATEGIES[r.index].name,
            icon: CORE_STRATEGIES[r.index].emoji,
            score: r.score,
            color: CORE_STRATEGIES[r.index].color,
          }))
        );
        appendAnimated(resultArea, bars, 0);

        // Winner announcement
        const winner = CORE_STRATEGIES[result.ranking[0].index];
        setTimeout(() => {
          const betCorrect = selectedBet === winner.name;
          appendAnimated(resultArea, text(
            t('act3.winner') + ` <strong style="color:${winner.color}">${winner.emoji} ${winner.name}</strong>！` +
            (betCorrect ? `<br><span style="color:#27ae60">${t('act3.bet_correct')}</span>` : `<br><span style="color:#e74c3c">${t('act3.bet_wrong')} ${selectedBet}——${t('act3.bet_wrong2')}</span>`)
          ), 0);

          appendAnimated(resultArea, text(
            result.ranking[0].index === 2
              ? t('act3.copyfish_wins')
              : '<strong>' + winner.name + '</strong> ' + t('act3.other_wins')
          ), 600);

          appendAnimated(resultArea, text(t('act3.transition')), 1200);

          const nextBtn = button(t('act3.next'), 'btn-primary', () => nextSlide());
          nextBtn.style.marginTop = '8px';
          appendAnimated(resultArea, nextBtn, 1800);
        }, 1000);
      }, 1500);
    };
  },
};
