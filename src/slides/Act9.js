// ACT 9: 终章 — 我们的海洋
import { text, button, appendAnimated } from '../core/UI.js';
import { t } from '../core/I18n.js';

export const Act9_Conclusion = {
  id: 'act9-conclusion',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0a2540 0%, #0d1b2a 100%)';

    appendAnimated(content, text(
      t('act9.intro')
    ), 0);

    // Three conditions
    const conditions = [
      {
        title: t('act9.cond1.title'),
        text: t('act9.cond1.text'),
        color: '#3498db',
      },
      {
        title: t('act9.cond2.title'),
        text: t('act9.cond2.text'),
        color: '#27ae60',
      },
      {
        title: t('act9.cond3.title'),
        text: t('act9.cond3.text'),
        color: '#9b59b6',
      },
    ];

    conditions.forEach((cond, i) => {
      const card = document.createElement('div');
      card.style.cssText = `width:100%;padding:18px 24px;background:${cond.color}15;border-left:4px solid ${cond.color};border-radius:0 12px 12px 0;`;
      card.innerHTML = `
        <div style="font-size:17px;font-weight:700;color:${cond.color};margin-bottom:6px">${cond.title}</div>
        <div style="font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7">${cond.text}</div>
      `;
      appendAnimated(content, card, 600 + i * 500);
    });

    setTimeout(() => {
      const quote = document.createElement('div');
      quote.className = 'text-quote';
      quote.style.marginTop = '8px';
      quote.innerHTML = t('act9.ostrom');
      appendAnimated(content, quote, 0);

      appendAnimated(content, text(
        t('act9.rules')
      ), 600);

      appendAnimated(content, text(
        t('act9.real')
      ), 1200);

      setTimeout(() => {
        // Final credits
        const credits = document.createElement('div');
        credits.style.cssText = 'width:100%;text-align:center;padding:24px 0;border-top:1px solid rgba(255,255,255,0.1);margin-top:16px;';
        credits.innerHTML = `
          <div style="font-family:var(--font-hand);font-size:28px;color:var(--text-light);margin-bottom:16px">${t('act9.credits.title')}</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.4);line-height:2">
            ${t('act9.credits.by')} <a href="https://ursb.me" target="_blank" style="color:#4da8da;text-decoration:none">Airing</a><br>
            ${t('act9.credits.inspired')} <a href="https://ncase.me/trust/" target="_blank" style="color:#4da8da;text-decoration:none">The Evolution of Trust</a> by Nicky Case<br>
            <a href="https://github.com/airingursb/overgrazing" target="_blank" style="color:#4da8da;text-decoration:none">${t('act9.credits.source')}</a><br><br>
            <span style="font-size:12px">
              ${t('act9.credits.refs')}<br>
              Garrett Hardin, "The Tragedy of the Commons" (1968)<br>
              Elinor Ostrom, <em>Governing the Commons</em> (1990)<br>
              Robert Axelrod, <em>The Evolution of Cooperation</em> (1984)<br>
              Nicky Case, <em>The Evolution of Trust</em> (2017)
            </span>
          </div>
        `;
        appendAnimated(content, credits, 0);
      }, 2000);
    }, 2200);
  },
};
