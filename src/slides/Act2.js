// ACT 2: 重复的海洋 — 多轮捕鱼与策略角色
import { nextSlide } from '../core/Slideshow.js';
import { text, button, buttonGroup, appendAnimated, createPond, createResultPanel } from '../core/UI.js';
import { MODERATE, OVERFISH, runRound, regenerate, DEFAULT_PARAMS } from '../sims/Commons.js';
import { Greedy, Moderate, Copyfish, Grudger, Detective, CORE_STRATEGIES } from '../sims/Strategies.js';
import { t } from '../core/I18n.js';

function createCharacterCard(strategy) {
  const card = document.createElement('div');
  card.style.cssText = `display:flex;align-items:center;gap:12px;padding:14px 18px;background:${strategy.color}20;border:2px solid ${strategy.color}60;border-radius:12px;width:100%;`;
  card.innerHTML = `
    <span style="font-size:28px">${strategy.emoji}</span>
    <div>
      <div style="font-weight:700;color:${strategy.color};font-size:15px">${strategy.name}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.6)">${strategy.description}</div>
    </div>
  `;
  return card;
}

// Slide: Intro to repeated games
export const Act2_Intro = {
  id: 'act2-intro',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act2.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act2.intro.1')), 400);

    appendAnimated(content, text(t('act2.intro.2')), 800);

    appendAnimated(content, text(t('act2.intro.3')), 1200);

    setTimeout(() => {
      CORE_STRATEGIES.forEach((s, i) => {
        appendAnimated(content, createCharacterCard(s), i * 200);
      });

      setTimeout(() => {
        const nextBtn = button(t('act2.intro.start'), 'btn-primary', () => nextSlide());
        appendAnimated(content, nextBtn, 0);
      }, CORE_STRATEGIES.length * 200 + 400);
    }, 1600);
  },
};

// Slide: Play against each opponent
export const Act2_Play = {
  id: 'act2-play',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const opponents = [...CORE_STRATEGIES];
    let opponentIndex = 0;
    let roundNum = 0;
    let population = 40;
    let playerScore = 0;
    let opponentScore = 0;
    let playerHistory = [];
    let opponentHistory = [];
    const maxRounds = 6;

    const statusBar = document.createElement('div');
    statusBar.style.cssText = 'width:100%;display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.5);';
    content.appendChild(statusBar);

    const updateStatus = () => {
      const opp = opponents[opponentIndex];
      statusBar.innerHTML = `
        <span>${t('act2.play.opponent')}: <strong style="color:${opp.color}">${opp.emoji} ${opp.name}</strong> (${opponentIndex + 1}/${opponents.length})</span>
        <span>${t('act2.play.round')} ${roundNum + 1}/${maxRounds}</span>
      `;
    };

    const mainArea = document.createElement('div');
    mainArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:16px;';
    content.appendChild(mainArea);

    const scoreBoard = document.createElement('div');
    scoreBoard.style.cssText = 'width:100%;display:flex;justify-content:space-around;padding:12px;background:rgba(255,255,255,0.05);border-radius:12px;';
    content.appendChild(scoreBoard);

    const updateScore = () => {
      scoreBoard.innerHTML = `
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">${t('act2.play.your_score')}</div><div style="font-size:22px;font-weight:700;color:#4da8da">${Math.round(playerScore * 10) / 10}</div></div>
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">${t('act2.play.fish_pop')}</div><div style="font-size:22px;font-weight:700;color:${population > 20 ? '#27ae60' : population > 10 ? '#f39c12' : '#e74c3c'}">${Math.round(population)}</div></div>
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">${t('act2.play.opp_score')}</div><div style="font-size:22px;font-weight:700;color:${opponents[opponentIndex].color}">${Math.round(opponentScore * 10) / 10}</div></div>
      `;
    };

    const startMatch = () => {
      roundNum = 0;
      population = 40;
      playerScore = 0;
      opponentScore = 0;
      playerHistory = [];
      opponentHistory = [];
      updateStatus();
      updateScore();
      showRound();
    };

    const showRound = () => {
      mainArea.innerHTML = '';

      if (roundNum >= maxRounds || population <= 5) {
        endMatch();
        return;
      }

      updateStatus();

      const pondEl = createPond(Math.round(population), 40);
      mainArea.appendChild(pondEl);

      const btns = buttonGroup(
        button(t('act2.play.btn_moderate'), 'btn-choice btn-moderate', () => playRound(MODERATE)),
        button(t('act2.play.btn_overfish'), 'btn-choice btn-overfish', () => playRound(OVERFISH)),
      );
      mainArea.appendChild(btns);
    };

    const playRound = (playerChoice) => {
      const opp = opponents[opponentIndex];
      const oppChoice = opp.play(opponentHistory, playerHistory, population, DEFAULT_PARAMS);

      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      const result = runRound(population, [playerChoice, oppChoice], params);

      playerScore += result.results[0].profit;
      opponentScore += result.results[1].profit;
      playerHistory.push(playerChoice);
      opponentHistory.push(oppChoice);
      population = result.newPopulation;
      roundNum++;

      // Show round result briefly
      mainArea.innerHTML = '';
      const resultText = document.createElement('div');
      resultText.style.cssText = 'text-align:center;color:rgba(255,255,255,0.8);font-size:15px;padding:20px;';
      resultText.innerHTML = `
        ${t('act2.play.you_chose')} <strong style="color:${playerChoice === MODERATE ? '#27ae60' : '#e74c3c'}">${playerChoice === MODERATE ? t('act2.play.moderate') : t('act2.play.overfish')}</strong> ·
        ${opp.emoji} ${t('act2.play.opp_chose')} <strong style="color:${oppChoice === MODERATE ? '#27ae60' : '#e74c3c'}">${oppChoice === MODERATE ? t('act2.play.moderate') : t('act2.play.overfish')}</strong><br>
        <span style="font-size:13px;color:rgba(255,255,255,0.4)">${t('act2.play.fish_pop')}: ${Math.round(population)} · ${t('act2.play.your_score')}: +${result.results[0].profit.toFixed(1)} · ${t('act2.play.opp_score')}: +${result.results[1].profit.toFixed(1)}</span>
      `;
      mainArea.appendChild(resultText);

      updateScore();

      setTimeout(showRound, 1200);
    };

    const endMatch = () => {
      mainArea.innerHTML = '';
      const opp = opponents[opponentIndex];

      const summary = document.createElement('div');
      summary.style.cssText = 'text-align:center;padding:16px;';
      const won = playerScore > opponentScore;
      summary.innerHTML = `
        <div style="font-size:16px;color:rgba(255,255,255,0.7);margin-bottom:8px">${t('act2.play.match_end')} ${opp.emoji} ${opp.name} ${t('act2.play.end')}</div>
        <div style="font-size:20px;font-weight:700;color:${won ? '#27ae60' : '#e74c3c'}">${won ? t('act2.play.you_won') : playerScore === opponentScore ? t('act2.play.tie') : t('act2.play.you_lost')}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-top:8px">${t('act2.play.your_score')}: ${playerScore.toFixed(1)} ${t('act2.play.vs')} ${opp.name}: ${opponentScore.toFixed(1)} · ${t('act2.play.remaining')}: ${Math.round(population)}</div>
      `;
      mainArea.appendChild(summary);

      if (opponentIndex < opponents.length - 1) {
        const nextBtn = button(`${t('act2.play.next_opp')}: ${opponents[opponentIndex + 1].emoji} ${opponents[opponentIndex + 1].name} →`, 'btn-next', () => {
          opponentIndex++;
          startMatch();
        });
        mainArea.appendChild(nextBtn);
      } else {
        // All opponents done
        setTimeout(() => {
          mainArea.innerHTML = '';
          const finalText = document.createElement('div');
          finalText.style.cssText = 'text-align:center;color:rgba(255,255,255,0.8);font-size:16px;line-height:1.8;';
          finalText.innerHTML = t('act2.play.summary');
          mainArea.appendChild(finalText);

          const nextBtn = button(t('act2.play.tournament_btn'), 'btn-primary', () => nextSlide());
          nextBtn.style.marginTop = '16px';
          mainArea.appendChild(nextBtn);
        }, 800);
      }
    };

    startMatch();
  },
};
