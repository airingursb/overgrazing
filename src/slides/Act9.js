// ACT 9: 终章 — 我们的海洋
import { text, button, appendAnimated } from '../core/UI.js';

export const Act9_Conclusion = {
  id: 'act9-conclusion',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0a2540 0%, #0d1b2a 100%)';

    appendAnimated(content, text(
      '博弈论和奥斯特罗姆的研究告诉我们，<br>避免公地悲剧需要<strong>三个条件</strong>：'
    ), 0);

    // Three conditions
    const conditions = [
      {
        title: '1. 重复互动',
        text: '信任需要时间来建立。<br>当渔民世代在同一片海域捕鱼——合作自然生长。<br>当工业渔船捞完就走——合作无从建立。',
        color: '#3498db',
      },
      {
        title: '2. 双赢的可能',
        text: '博弈必须是非零和的——<br>合作的总收益要大于互相竞争。<br>当补贴扭曲了收益结构，双赢就消失了。',
        color: '#27ae60',
      },
      {
        title: '3. 低噪音',
        text: '误解会摧毁合作。<br>透明的信息、清晰的沟通、<br>低成本的冲突解决——降低噪音。',
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
      quote.innerHTML = '加上好的制度设计——奥斯特罗姆的八条原则——<br>公地悲剧<strong style="color:#f39c12">不是注定的</strong>。';
      appendAnimated(content, quote, 0);

      appendAnimated(content, text(
        '游戏定义玩家的行为。<br>但长远来看——<strong>是我们定义游戏的规则。</strong>'
      ), 600);

      appendAnimated(content, text(
        '这不仅仅是关于鱼的故事。<br><br>' +
        '大气层是我们的公地——气候变化。<br>' +
        '海洋是我们的公地——过度捕捞。<br>' +
        '互联网是我们的公地——注意力经济。<br>' +
        '民主制度是我们的公地——公民参与。<br><br>' +
        '每一个共享资源，都面临同样的博弈。<br>' +
        '而解决方案的关键，不在于把人变得更好——<br>' +
        '而在于<strong>设计更好的游戏规则</strong>。'
      ), 1200);

      setTimeout(() => {
        // Final credits
        const credits = document.createElement('div');
        credits.style.cssText = 'width:100%;text-align:center;padding:24px 0;border-top:1px solid rgba(255,255,255,0.1);margin-top:16px;';
        credits.innerHTML = `
          <div style="font-family:var(--font-hand);font-size:28px;color:var(--text-light);margin-bottom:16px">公地的进化</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.4);line-height:2">
            Made by <a href="https://ursb.me" target="_blank" style="color:#4da8da;text-decoration:none">Airing</a><br>
            灵感来源于 <a href="https://ncase.me/trust/" target="_blank" style="color:#4da8da;text-decoration:none">The Evolution of Trust</a> by Nicky Case<br>
            <a href="https://github.com/airingursb/overgrazing" target="_blank" style="color:#4da8da;text-decoration:none">GitHub 开源</a><br><br>
            <span style="font-size:12px">
              参考文献：<br>
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
