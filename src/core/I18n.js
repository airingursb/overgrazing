// Internationalization module
// Supports EN (default) and ZH

const translations = {
  // === COVER ===
  'cover.title.zh': '公地的进化',
  'cover.title.en': 'The Evolution of the Commons',
  'cover.subtitle.zh': 'The Evolution of the Commons',
  'cover.subtitle.en': 'An Interactive Explorable Explanation',
  'cover.desc.zh': '一个关于"公地悲剧"的互动式可探索解释<br>游玩时间约 25 分钟',
  'cover.desc.en': 'An interactive explorable explanation<br>about the Tragedy of the Commons<br>~25 minutes to play',
  'cover.start': { zh: '开始 →', en: 'Start →' },
  'cover.credits.zh': '灵感来源于 Nicky Case 的 <a href="https://ncase.me/trust/" target="_blank">The Evolution of Trust</a><br>Made by <a href="https://ursb.me" target="_blank">Airing</a> · <a href="https://github.com/airingursb/overgrazing" target="_blank">GitHub</a>',
  'cover.credits.en': 'Inspired by Nicky Case\'s <a href="https://ncase.me/trust/" target="_blank">The Evolution of Trust</a><br>Made by <a href="https://ursb.me" target="_blank">Airing</a> · <a href="https://github.com/airingursb/overgrazing" target="_blank">GitHub</a>',

  // === ACT 0 ===
  'act0.intro.1': { zh: '1497年，意大利探险家约翰·卡伯特驶向北美东海岸。', en: 'In 1497, Italian explorer John Cabot sailed to the northeast coast of North America.' },
  'act0.intro.2': { zh: '他发现了一片海域——鳕鱼多到令人难以置信。<br>据说，只要把篮子放入水中，就能捞起满满的鱼。', en: 'He discovered waters so thick with cod, it was said<br>you could catch them simply by lowering a basket into the sea.' },
  'act0.intro.3': { zh: '这片海域叫做<strong>"纽芬兰大浅滩"</strong>。', en: 'This place was called the <strong>"Grand Banks of Newfoundland"</strong>.' },
  'act0.intro.4': { zh: '此后五百年，鳕鱼养活了整个地区。<br>渔民世代相传，小镇因鱼而繁荣。', en: 'For five hundred years, cod sustained the entire region.<br>Fishing families passed the trade through generations, towns thrived on fish.' },
  'act0.scratch': {
    zh: `<div style="line-height:2.2">
        <strong style="color:#f39c12">1968年</strong>：捕获量达到历史峰值——<strong>81万吨</strong>。<br>
        <strong style="color:#e67e22">1975年</strong>：鱼群开始明显减少。<br>
        <strong style="color:#e74c3c">1992年</strong>：鳕鱼数量跌至历史水平的 <strong>1%</strong>。<br><br>
        加拿大政府宣布<strong style="color:#e74c3c">全面禁渔</strong>。<br><br>
        一夜之间，<strong>4万人失业</strong>。<br>
        数百个沿海社区陷入绝境。<br>
        一个延续了五百年的产业，就此终结。
      </div>`,
    en: `<div style="line-height:2.2">
        <strong style="color:#f39c12">1968</strong>: Catches peaked at <strong>810,000 tonnes</strong>.<br>
        <strong style="color:#e67e22">1975</strong>: Fish stocks began to visibly decline.<br>
        <strong style="color:#e74c3c">1992</strong>: Cod numbers fell to <strong>1%</strong> of historic levels.<br><br>
        The Canadian government declared a <strong style="color:#e74c3c">total fishing moratorium</strong>.<br><br>
        Overnight, <strong>40,000 people lost their jobs</strong>.<br>
        Hundreds of coastal communities were devastated.<br>
        A five-hundred-year-old industry, gone.
      </div>`,
  },
  'act0.scratch.hint': { zh: '👆 用鼠标刮开看看', en: '👆 Scratch to reveal' },
  'act0.chart.btn': { zh: '看看数据 →', en: 'See the data →' },
  'act0.chart.intro': { zh: '这张图展示了纽芬兰鳕鱼的捕获量变化：', en: 'This chart shows the Newfoundland cod catch over time:' },
  'act0.chart.ylabel': { zh: '捕获量（万吨）', en: 'Catch (10k tonnes)' },
  'act0.chart.ann.peak': { zh: '峰值: 81万吨', en: 'Peak: 810k t' },
  'act0.chart.ann.trawl': { zh: '拖网渔船出现', en: 'Trawlers arrive' },
  'act0.chart.ann.ban': { zh: '禁渔令', en: 'Moratorium' },
  'act0.chart.text1': { zh: '超级拖网渔船用15年捕获的鱼，<br>等于之前<strong>103年</strong>的总量。', en: 'Super trawlers caught more fish in 15 years<br>than the previous <strong>103 years</strong> combined.' },
  'act0.chart.text2': { zh: '每个渔民都想多捕一点，这很"理性"。<br>但所有人都这么做的时候……', en: 'Every fisherman wanted to catch a little more — that\'s "rational."<br>But when everyone thinks the same way...' },
  'act0.chart.next': { zh: '继续 →', en: 'Continue →' },
  'act0.q.1': { zh: '这不只是纽芬兰的故事。', en: 'This isn\'t just Newfoundland\'s story.' },
  'act0.q.2': { zh: '全球 <strong>35.5%</strong> 的鱼类种群被过度捕捞。<br>从地中海到南中国海，同样的悲剧在重复上演。', en: '<strong>35.5%</strong> of global fish stocks are overfished.<br>From the Mediterranean to the South China Sea, the same tragedy repeats.' },
  'act0.q.quote': {
    zh: '1968年，生态学家加勒特·哈丁给这个现象起了一个名字：<br><strong style="font-size:24px;color:#f39c12">"公地悲剧"</strong><br>(The Tragedy of the Commons)',
    en: 'In 1968, ecologist Garrett Hardin gave this phenomenon a name:<br><strong style="font-size:24px;color:#f39c12">"The Tragedy of the Commons"</strong>',
  },
  'act0.q.3': { zh: '当一群人共享一份资源，<br>每个人都倾向于多拿一点——<br>直到资源彻底耗尽。', en: 'When a group shares a resource,<br>everyone is tempted to take a little more —<br>until the resource is completely exhausted.' },
  'act0.q.4': { zh: '这些渔民是坏人吗？<br>不。他们只是在做对自己"最有利"的选择。', en: 'Were these fishermen bad people?<br>No. They were simply making the "best" choice for themselves.' },
  'act0.q.5': { zh: '但如果每个人都做"最有利"的选择，<br>结果却是所有人都输了——', en: 'But when everyone makes the "best" choice,<br>the result is that everyone loses —' },
  'act0.q.6': { zh: '<em>这到底是怎么发生的？</em><br>博弈论可以帮我们理解这个问题。', en: '<em>How does this happen?</em><br>Game theory can help us understand.' },
  'act0.q.next': { zh: '……让我们来玩一个捕鱼游戏。→', en: '...Let\'s play a fishing game. →' },

  // === ACT 1 ===
  'act1.title': { zh: '第一章：捕鱼的博弈', en: 'Chapter 1: The Fishing Game' },
  'act1.setup.1': { zh: '你面前有一片渔场。渔场里有 <strong>20 条鱼</strong>。<br>你和另外 3 艘渔船共享这片海域。', en: 'You\'re at a fishery with <strong>20 fish</strong>.<br>You share these waters with 3 other boats.' },
  'act1.setup.2': { zh: '每艘船可以选择：<br>🟢 <strong>"节制捕捞"</strong>（捞 2 条）或 🔴 <strong>"过度捕捞"</strong>（捞 5 条）<br>每条鱼值 1 金币，出海成本 2 金币。', en: 'Each boat can choose:<br>🟢 <strong>"Fish Moderately"</strong> (catch 2) or 🔴 <strong>"Overfish"</strong> (catch 5)<br>Each fish is worth 1 coin, trip cost is 2 coins.' },
  'act1.setup.you': { zh: '你', en: 'You' },
  'act1.setup.boat': { zh: '渔船', en: 'Boat' },
  'act1.setup.start': { zh: '开始第一轮 →', en: 'Start Round 1 →' },
  'act1.c1.premise': { zh: '假设其他 3 艘船<strong style="color:#e74c3c">都选择了过度捕捞</strong>，每艘捞 5 条。', en: 'Suppose the other 3 boats <strong style="color:#e74c3c">all chose to overfish</strong>, catching 5 each.' },
  'act1.c1.question': { zh: '<em>你怎么选？</em>', en: '<em>What do you choose?</em>' },
  'act1.btn.moderate': { zh: '🟢 节制捕捞（捞 2 条）', en: '🟢 Fish Moderately (catch 2)' },
  'act1.btn.overfish': { zh: '🔴 过度捕捞（捞 5 条）', en: '🔴 Overfish (catch 5)' },
  'act1.c1.overfish': { zh: '没错！别人都在拼命捞，你不多捞就亏了。', en: 'Right! When everyone else is grabbing all they can, you\'d lose out by holding back.' },
  'act1.c1.moderate': { zh: '很遗憾，你的克制并没有拯救这片渔场。<br>其他人捞了 15 条，你只捞了 2 条。', en: 'Unfortunately, your restraint didn\'t save the fishery.<br>Others caught 15 fish while you only caught 2.' },
  'act1.label.your_catch': { zh: '你的捕获', en: 'Your catch' },
  'act1.label.your_profit': { zh: '你的利润', en: 'Your profit' },
  'act1.label.others_catch': { zh: '其他船捕获', en: 'Others\' catch' },
  'act1.label.remaining': { zh: '渔场剩余', en: 'Fish remaining' },
  'act1.unit.fish': { zh: '条', en: '' },
  'act1.unit.coin': { zh: '金币', en: 'coins' },
  'act1.unit.per_boat': { zh: '每船', en: 'per boat' },
  'act1.c1.lesson': { zh: '不管怎样，渔场都快完了。<br>但至少过度捕捞让你<strong>"多赚了 3 金币"</strong>。<br><br>因此：在别人过度捕捞时，你<strong>"应该"</strong>也过度捕捞。', en: 'Either way, the fishery is nearly depleted.<br>But at least overfishing earned you <strong>"3 more coins."</strong><br><br>Therefore: when others overfish, you <strong>"should"</strong> overfish too.' },
  'act1.c1.next': { zh: '再试一次 →', en: 'Try again →' },
  'act1.c2.premise': { zh: '好，再来一次。<br>这次假设其他 3 艘船<strong style="color:#27ae60">都选择了节制捕捞</strong>，每艘只捞 2 条。', en: 'OK, let\'s try again.<br>This time, suppose the other 3 boats <strong style="color:#27ae60">all chose to fish moderately</strong>, catching only 2 each.' },
  'act1.c2.overfish': { zh: '这有点不厚道……但从数学上看，你是对的。', en: 'That\'s a bit unfair... but mathematically, you\'re right.' },
  'act1.c2.moderate': { zh: '看起来是正确的选择……但真的是吗？', en: 'Seems like the right choice... but is it really?' },
  'act1.c2.lesson_overfish': { zh: '虽然大家都节制时渔场最健康，<br>但你偷偷多捞一点，赚了最多——<strong>而且渔场也没崩</strong>。', en: 'The fishery is healthiest when everyone shows restraint,<br>but you sneaked in extra catches, earned the most — <strong>and the fishery survived</strong>.' },
  'act1.c2.lesson_moderate': { zh: '大家都节制时，渔场还有 12 条鱼，很健康。<br>但如果你偷偷多捞……你能赚更多，渔场也还撑得住。', en: 'When everyone is moderate, the fishery has 12 fish left — healthy.<br>But if you sneaked in more... you\'d earn more, and the fishery would still survive.' },
  'act1.c2.conclusion': { zh: '因此：即使别人都节制，你<strong>"应该"</strong>还是过度捕捞。', en: 'Therefore: even when others are moderate, you <strong>"should"</strong> still overfish.' },
  'act1.c2.next': { zh: '这意味着什么？ →', en: 'What does this mean? →' },
  'act1.reveal.title': { zh: '这就是公地的困境', en: 'This is the Dilemma of the Commons' },
  'act1.reveal.1': { zh: '不管其他人怎么做——<br><strong>"过度捕捞"对你个人来说，似乎总是更好的选择。</strong>', en: 'No matter what others do —<br><strong>"Overfishing" always seems like the better choice for you personally.</strong>' },
  'act1.reveal.2': { zh: '但如果每个人都这么想……', en: 'But if everyone thinks this way...' },
  'act1.reveal.3': { zh: '所有人都赚了 3 金币。但渔场的鱼<strong style="color:#e74c3c">全部捞完了</strong>。<br>没有了鱼，明天就没有收入。', en: 'Everyone earned 3 coins. But the fishery\'s fish are <strong style="color:#e74c3c">all gone</strong>.<br>No fish means no income tomorrow.' },
  'act1.reveal.4': { zh: '如果大家都节制呢？<br>每人赚 0 金币——但渔场还有 12 条鱼。<br>鱼会繁殖，明天还能继续捕。', en: 'What if everyone showed restraint?<br>Each earns 0 coins — but the fishery still has 12 fish.<br>Fish reproduce, and you can keep fishing tomorrow.' },
  'act1.reveal.5': { zh: '短期来看，贪婪是<strong>"理性"</strong>的。<br>长期来看……', en: 'In the short term, greed is <strong>"rational."</strong><br>In the long term...' },
  'act1.reveal.6': { zh: '等一下。在刚才的游戏里，你只玩了<strong>一轮</strong>。<br>渔场不是一次性的——渔民每天都要出海。<br><em>如果不是一锤子买卖，而是反复博弈呢？</em>', en: 'Wait. In the game we just played, you only played <strong>one round</strong>.<br>A fishery isn\'t a one-time deal — fishermen go out every day.<br><em>What if it\'s not a one-shot game, but a repeated one?</em>' },
  'act1.reveal.next': { zh: '……玩很多很多轮呢？→', en: '...What if we play many rounds? →' },

  // === ACT 2 ===
  'act2.title': { zh: '第二章：重复的海洋', en: 'Chapter 2: The Repeated Ocean' },
  'act2.intro.1': { zh: '现在，不只是一轮——你要和对手<strong>反复博弈</strong>。<br>每轮结束后，鱼群会<strong>繁殖恢复</strong>。', en: 'Now it\'s not just one round — you\'ll play <strong>repeated games</strong>.<br>After each round, the fish population <strong>regenerates</strong>.' },
  'act2.intro.2': { zh: '渔场初始 <strong>40 条鱼</strong>，承载力 40 条。<br>每轮两艘船同时选择节制（3条）或过度（6条）。<br>然后鱼群按自然规律繁殖。', en: 'Starting fish: <strong>40</strong>, carrying capacity: 40.<br>Each round, two boats simultaneously choose moderate (3) or overfish (6).<br>Then the fish regenerate naturally.' },
  'act2.intro.3': { zh: '你将依次对战 <strong>5 位不同策略</strong>的对手。<br>先来认识一下他们：', en: 'You\'ll face <strong>5 different strategies</strong> in sequence.<br>Let\'s meet them:' },
  'act2.intro.start': { zh: '开始对战 →', en: 'Start battles →' },
  'act2.play.opponent': { zh: '对手', en: 'Opponent' },
  'act2.play.round': { zh: '第', en: 'Round' },
  'act2.play.of': { zh: '轮', en: '' },
  'act2.play.btn_moderate': { zh: '🟢 节制（3条）', en: '🟢 Moderate (3)' },
  'act2.play.btn_overfish': { zh: '🔴 过度（6条）', en: '🔴 Overfish (6)' },
  'act2.play.you_chose': { zh: '你选择了', en: 'You chose' },
  'act2.play.opp_chose': { zh: '选择了', en: 'chose' },
  'act2.play.moderate': { zh: '节制', en: 'Moderate' },
  'act2.play.overfish': { zh: '过度', en: 'Overfish' },
  'act2.play.fish_pop': { zh: '鱼群', en: 'Fish' },
  'act2.play.your_score': { zh: '你的总分', en: 'Your Score' },
  'act2.play.opp_score': { zh: '对手总分', en: 'Opponent' },
  'act2.play.match_end': { zh: '对战', en: 'vs' },
  'act2.play.end': { zh: '结束', en: 'ended' },
  'act2.play.you_won': { zh: '你赢了！', en: 'You won!' },
  'act2.play.tie': { zh: '平局！', en: 'Tie!' },
  'act2.play.you_lost': { zh: '你输了！', en: 'You lost!' },
  'act2.play.vs': { zh: 'vs', en: 'vs' },
  'act2.play.remaining': { zh: '鱼群剩余', en: 'Fish remaining' },
  'act2.play.next_opp': { zh: '下一位对手', en: 'Next opponent' },
  'act2.play.summary': {
    zh: `你已经见过了所有 5 种策略。<br><br>
            <strong style="color:#27ae60">节制号</strong>对谁都友好——但容易被占便宜。<br>
            <strong style="color:#e74c3c">贪婪号</strong>短期赚得最多——但鱼塘崩了。<br>
            <strong style="color:#3498db">模仿号</strong>以牙还牙——似乎最"公平"。<br>
            <strong style="color:#f39c12">记仇号</strong>一旦被伤害就永不原谅。<br>
            <strong style="color:#8e6e53">侦探号</strong>先试探，再决定是合作还是剥削。<br><br>
            <em style="color:#4da8da">如果让它们互相对战，谁会赢？</em>`,
    en: `You\'ve now met all 5 strategies.<br><br>
            <strong style="color:#27ae60">Moderate</strong> is friendly to everyone — but easily exploited.<br>
            <strong style="color:#e74c3c">Greedy</strong> earns the most short-term — but crashes the fishery.<br>
            <strong style="color:#3498db">Copyfish</strong> mirrors your moves — seems the most "fair."<br>
            <strong style="color:#f39c12">Grudger</strong> never forgives once betrayed.<br>
            <strong style="color:#8e6e53">Detective</strong> probes first, then decides to cooperate or exploit.<br><br>
            <em style="color:#4da8da">If they compete against each other, who wins?</em>`,
  },
  'act2.play.tournament_btn': { zh: '看看锦标赛 →', en: 'See the tournament →' },

  // === ACT 3 ===
  'act3.title': { zh: '第三章：渔场锦标赛', en: 'Chapter 3: The Fishing Tournament' },
  'act3.intro': { zh: '现在，让 5 种策略互相对战。<br>每对选手进行 <strong>10 轮</strong>比赛，共 10 场配对赛。<br>统计每个角色的<strong>总收益</strong>。', en: 'Now, let 5 strategies compete against each other.<br>Each pair plays <strong>10 rounds</strong>, for a total of 10 matchups.<br>We track each character\'s <strong>total earnings</strong>.' },
  'act3.bet': { zh: '<em>在开始之前——你觉得谁会赢？</em>', en: '<em>Before we start — who do you think will win?</em>' },
  'act3.start': { zh: '开始锦标赛 →', en: 'Start Tournament →' },
  'act3.running': { zh: '锦标赛进行中……', en: 'Tournament in progress...' },
  'act3.winner': { zh: '🏆 冠军是', en: '🏆 The champion is' },
  'act3.bet_correct': { zh: '你猜对了！', en: 'You guessed right!' },
  'act3.bet_wrong': { zh: '你选的是', en: 'You picked' },
  'act3.bet_wrong2': { zh: '没关系。', en: '— no worries.' },
  'act3.copyfish_wins': { zh: '<strong>模仿号</strong>赢了！它不是最聪明的，<br>但"以牙还牙"在重复博弈中是最稳定的策略。<br>它对合作者合作，对贪婪者报复——简单而有效。', en: '<strong>Copyfish</strong> wins! It\'s not the smartest,<br>but "tit-for-tat" is the most stable strategy in repeated games.<br>It cooperates with cooperators and retaliates against exploiters — simple and effective.' },
  'act3.other_wins': { zh: '赢了这次锦标赛！<br>在不同参数下，结果可能不同。', en: 'won this tournament!<br>With different parameters, results may vary.' },
  'act3.transition': { zh: '模仿号赢了一次锦标赛。<br>但如果我们<strong>反复进行</strong>锦标赛呢？<br>让赢家繁殖，让输家淘汰——就像<em>自然选择</em>一样。', en: 'Copyfish won one tournament.<br>But what if we <strong>repeat</strong> the tournament?<br>Let winners reproduce, let losers die out — like <em>natural selection</em>.' },
  'act3.next': { zh: '看看进化会发生什么 →', en: 'See what evolution brings →' },

  // === ACT 4 ===
  'act4.title': { zh: '第四章：策略的进化', en: 'Chapter 4: The Evolution of Strategies' },
  'act4.intro': { zh: '现在我们模拟<strong>进化</strong>。<br>规则很简单：每一代进行锦标赛，<br>得分最低的被淘汰，得分最高的繁殖。', en: 'Now let\'s simulate <strong>evolution</strong>.<br>The rules are simple: each generation runs a tournament,<br>the lowest scorers are eliminated, the highest scorers reproduce.' },
  'act4.pop': { zh: '初始种群：节制号 ×8、贪婪号 ×5、模仿号 ×5、记仇号 ×4、侦探号 ×3', en: 'Starting population: Moderate ×8, Greedy ×5, Copyfish ×5, Grudger ×4, Detective ×3' },
  'act4.ready': { zh: '准备播放……', en: 'Ready to play...' },
  'act4.play': { zh: '▶ 播放进化过程', en: '▶ Play Evolution' },
  'act4.gen': { zh: '第', en: 'Gen' },
  'act4.gen_suffix': { zh: '代', en: '' },
  'act4.of': { zh: '/', en: '/' },
  'act4.done': { zh: '进化完成', en: 'Evolution complete' },
  'act4.dominant': { zh: '经过 15 代进化，', en: 'After 15 generations,' },
  'act4.dominant2': { zh: '成为了主导策略！', en: 'became the dominant strategy!' },
  'act4.analysis': {
    zh: '注意发生了什么：<br><strong style="color:#e74c3c">贪婪号</strong>一开始大量"收割"节制号——但很快，节制号消亡了。<br>没有了可以剥削的对象，贪婪号也开始衰落。<br>最终，<strong>能对合作者合作、对背叛者报复</strong>的策略存活了下来。',
    en: 'Notice what happened:<br><strong style="color:#e74c3c">Greedy</strong> initially "harvested" Moderate players heavily — but soon, Moderates died out.<br>With no one left to exploit, Greedy declined too.<br>In the end, strategies that <strong>cooperate with cooperators and retaliate against defectors</strong> survived.',
  },
  'act4.lesson': { zh: '<em>合作不是因为善良，而是因为它在进化中更有优势。</em>', en: '<em>Cooperation doesn\'t emerge from goodness — it emerges because it\'s evolutionarily superior.</em>' },
  'act4.but': {
    zh: '看起来一切都很美好——合作最终胜出了！<br><br><strong>但是</strong>——如果真是这样，为什么现实中到处都是过度捕捞？<br>为什么纽芬兰的鳕鱼还是崩溃了？',
    en: 'Everything looks great — cooperation won!<br><br><strong>But</strong> — if that\'s true, why is overfishing rampant in the real world?<br>Why did Newfoundland\'s cod still collapse?',
  },
  'act4.next': { zh: '到底哪里出了问题？ →', en: 'What went wrong? →' },

  // === ACT 5 ===
  'act5.title': { zh: '第五章：公地的崩溃', en: 'Chapter 5: The Collapse of the Commons' },
  'act5.r.intro': { zh: '在之前的进化中，合作胜出了。<br>但那是因为博弈条件<strong>对合作有利</strong>。<br><br>如果我们改变游戏规则呢？', en: 'In the previous evolution, cooperation won.<br>But that\'s because the conditions <strong>favored cooperation</strong>.<br><br>What if we change the rules?' },
  'act5.r.var1': { zh: '<strong>第一个变量：博弈轮数。</strong><br><br>之前每场比赛 8 轮。如果渔民<strong>不需要长期留在同一渔场</strong>呢？<br>比如工业渔船——捞完就走，明天换个地方。', en: '<strong>First variable: number of rounds.</strong><br><br>Previously each match was 8 rounds. What if fishermen <strong>don\'t need to stay at the same fishery</strong>?<br>Like industrial trawlers — catch and move on.' },
  'act5.r.try': { zh: '试试调低博弈轮数，看看会发生什么：', en: 'Try lowering the number of rounds and see what happens:' },
  'act5.r.slider': { zh: '每场比赛轮数', en: 'Rounds per match' },
  'act5.r.low': { zh: '博弈只有 {n} 轮时，<strong style="color:#e74c3c">贪婪号主导了世界</strong>（{pct}%）。<br>来不及报复，合作根本无法建立。', en: 'With only {n} rounds, <strong style="color:#e74c3c">Greedy dominates</strong> ({pct}%).<br>No time to retaliate — cooperation can\'t be established.' },
  'act5.r.mid': { zh: '{n} 轮博弈——合作开始有点机会，但贪婪仍然很强。', en: '{n} rounds — cooperation has a chance, but Greedy is still strong.' },
  'act5.r.high': { zh: '{n} 轮博弈——合作策略有足够时间建立信任和报复机制。', en: '{n} rounds — cooperative strategies have enough time to build trust and retaliation.' },
  'act5.r.lesson': { zh: '当博弈轮数很少时，就像<strong>工业化捕捞</strong>——<br>渔船不需要和当地社区共存，捞完就走。<br>合作根本来不及建立。', en: 'When rounds are few, it\'s like <strong>industrial fishing</strong> —<br>trawlers don\'t need to coexist with local communities.<br>Cooperation never has time to develop.' },
  'act5.r.next': { zh: '还有另一个变量…… →', en: 'There\'s another variable... →' },
  'act5.p.var2': { zh: '<strong>第二个变量：收益结构。</strong><br><br>当鱼变得稀缺时，价格会上涨。<br>这意味着——过度捕捞的诱惑<strong>变得更大</strong>。', en: '<strong>Second variable: payoff structure.</strong><br><br>When fish become scarce, prices rise.<br>This means the temptation to overfish <strong>grows stronger</strong>.' },
  'act5.p.try': { zh: '试试调高稀缺性溢价：', en: 'Try increasing the scarcity premium:' },
  'act5.p.slider': { zh: '稀缺性溢价', en: 'Scarcity premium' },
  'act5.p.high': { zh: '稀缺性溢价 ×{v}——过度捕捞变得<strong style="color:#e74c3c">极其有利可图</strong>。<br>就像鱼翅贸易：鲨鱼越少，价格越高，捕杀动机越强。', en: 'Scarcity premium ×{v} — overfishing becomes <strong style="color:#e74c3c">extremely profitable</strong>.<br>Like the shark fin trade: fewer sharks → higher prices → more hunting.' },
  'act5.p.mid': { zh: '稀缺性溢价 ×{v}——过度捕捞的诱惑在增加。', en: 'Scarcity premium ×{v} — the temptation to overfish is growing.' },
  'act5.p.low': { zh: '稀缺性溢价 ×{v}——鱼价稳定，合作更容易维持。', en: 'Scarcity premium ×{v} — stable prices make cooperation easier.' },
  'act5.p.subsidy': { zh: '现实中，政府补贴也会扭曲收益结构——<br>全球每年 <strong>350 亿美元</strong>的渔业补贴中，<br>大部分补贴了大型工业渔船，降低了过度捕捞的成本。', en: 'In reality, government subsidies also distort the payoff structure —<br>of the <strong>$35 billion</strong> in annual fishing subsidies worldwide,<br>most go to large industrial vessels, lowering the cost of overfishing.' },
  'act5.p.quote': { zh: '不是人变坏了，是<strong>游戏规则</strong>变了。<br>当重复互动减少、双赢空间缩小时——<br>合作就会崩溃。', en: 'People didn\'t get worse — the <strong>rules of the game</strong> changed.<br>When repeated interactions decrease and win-win opportunities shrink —<br>cooperation collapses.' },
  'act5.p.transition': { zh: '重复博弈和双赢结构很重要。<br><strong>但是</strong>——还有一个致命的问题我一直没提……', en: 'Repeated games and win-win structures matter.<br><strong>But</strong> — there\'s one more deadly problem I haven\'t mentioned...' },
  'act5.p.next': { zh: '什么问题？ →', en: 'What problem? →' },

  // === ACT 6 ===
  'act6.title': { zh: '第六章：噪音与宽容', en: 'Chapter 6: Noise and Forgiveness' },
  'act6.intro1': { zh: '模仿号虽然厉害，但它有一个<strong style="color:#e74c3c">致命的弱点</strong>。', en: 'Copyfish is powerful, but it has one <strong style="color:#e74c3c">fatal weakness</strong>.' },
  'act6.intro2': { zh: '想象两艘模仿号在同一片渔场。<br>正常情况下，它们会一直合作——永远和平。<br><br>但如果有一天，其中一艘<strong>不小心</strong>多捞了几条呢？<br>也许是看错了数量，也许是网太大了——总之，是个<strong>意外</strong>。', en: 'Imagine two Copyfish at the same fishery.<br>Normally, they\'d cooperate forever — eternal peace.<br><br>But what if one day, one <strong>accidentally</strong> caught too many?<br>Maybe a miscount, maybe the net was too big — an <strong>accident</strong>.' },
  'act6.intro3': { zh: '模仿号的反应是什么？<strong>报复。</strong><br>然后对方也报复。然后你再报复……<br><br>一次意外，引发<strong>无限循环的报复战争</strong>。<br>这就是现实中<em>"世仇"</em>和<em>"螺旋升级"</em>的原因。', en: 'What\'s Copyfish\'s response? <strong>Retaliation.</strong><br>Then the other retaliates. Then you retaliate again...<br><br>One accident triggers an <strong>endless cycle of revenge</strong>.<br>This is the real-world cause of <em>"feuds"</em> and <em>"escalation spirals."</em>' },
  'act6.intro4': { zh: '在真实世界中，"噪音"——误解、意外、信息不完全——<br>是无法避免的。<br><br>试试调节噪音率，看看对进化的影响：', en: 'In the real world, "noise" — misunderstandings, accidents, incomplete information —<br>is unavoidable.<br><br>Try adjusting the noise rate and see how it affects evolution:' },
  'act6.slider': { zh: '噪音率（误操作概率）', en: 'Noise rate (error probability)' },
  'act6.zero': { zh: '零噪音——<strong style="color:#3498db">模仿号</strong>表现最好。完美的世界。', en: 'Zero noise — <strong style="color:#3498db">Copyfish</strong> performs best. A perfect world.' },
  'act6.low': { zh: '{n}% 噪音——<strong style="color:#9b59b6">宽容号</strong>开始超越模仿号。<br>偶尔的误解需要宽容来化解。', en: '{n}% noise — <strong style="color:#9b59b6">Forgiving</strong> starts outperforming Copyfish.<br>Occasional misunderstandings need forgiveness.' },
  'act6.mid': { zh: '{n}% 噪音——模仿号陷入报复螺旋，<br><strong style="color:#9b59b6">宽容号</strong>和<strong style="color:#bdc3c7">憨憨号</strong>更有优势。', en: '{n}% noise — Copyfish falls into retaliation spirals,<br><strong style="color:#9b59b6">Forgiving</strong> and <strong style="color:#bdc3c7">Simpleton</strong> gain the edge.' },
  'act6.high': { zh: '{n}% 噪音——世界一片混乱。<br>当误解太多时，<strong style="color:#e74c3c">谁都无法建立稳定的合作</strong>。', en: '{n}% noise — total chaos.<br>With too many errors, <strong style="color:#e74c3c">no one can maintain stable cooperation</strong>.' },
  'act6.findings': {
    zh: '<strong>关键发现：</strong><br>零噪音 → 模仿号赢（精确报复有效）<br>低噪音 → <strong style="color:#9b59b6">宽容号</strong>赢（宽容化解误会）<br>高噪音 → 一切崩溃（合作无法建立）',
    en: '<strong>Key findings:</strong><br>Zero noise → Copyfish wins (precise retaliation works)<br>Low noise → <strong style="color:#9b59b6">Forgiving</strong> wins (forgiveness resolves misunderstandings)<br>High noise → Everything collapses (cooperation can\'t be built)',
  },
  'act6.transition': { zh: '噪音会破坏合作。<br><strong>但是</strong>——现实世界中有些渔场却管理得很好！<br>它们是怎么做到的？', en: 'Noise destroys cooperation.<br><strong>But</strong> — some real-world fisheries are managed very well!<br>How do they do it?' },
  'act6.next': { zh: '让我们看看解决方案 →', en: 'Let\'s see the solution →' },

  // === ACT 7 ===
  'act7.title': { zh: '第七章：奥斯特罗姆的八条', en: 'Chapter 7: Ostrom\'s Eight Principles' },
  'act7.intro1': { zh: '1990年，政治经济学家<strong>埃莉诺·奥斯特罗姆</strong>发表了<br>《公共事物的治理之道》。<br><br>她研究了全球数十个成功管理公地的案例——<br>从瑞士的高山草场，到日本的渔场，到西班牙的灌溉系统。', en: 'In 1990, political economist <strong>Elinor Ostrom</strong> published<br><em>Governing the Commons</em>.<br><br>She studied dozens of successful commons management cases worldwide —<br>from Swiss alpine meadows, to Japanese fisheries, to Spanish irrigation systems.' },
  'act7.intro2': { zh: '她发现了 <strong>8 条设计原则</strong>，<br>成功的公地治理几乎都遵循这些原则。<br><br>2009年，她因此获得了<strong style="color:#f39c12">诺贝尔经济学奖</strong>——<br>也是第一位获此殊荣的女性。', en: 'She identified <strong>8 design principles</strong>,<br>followed by nearly all successful commons governance.<br><br>In 2009, she won the <strong style="color:#f39c12">Nobel Prize in Economics</strong> —<br>the first woman to receive it.' },
  'act7.intro3': { zh: '用博弈论的语言来说，<br>奥斯特罗姆的原则就是在<strong>改变游戏规则</strong>——<br>让合作变得更容易，让背叛变得更困难。<br><br>把这些原则拖到渔场上，看看效果：', en: 'In game theory terms,<br>Ostrom\'s principles <strong>change the rules of the game</strong> —<br>making cooperation easier and defection harder.<br><br>Apply these principles to our fishery and see the effects:' },
  'act7.drop_hint': { zh: '👇 点击规则卡片应用到渔场', en: '👇 Click rule cards to apply to the fishery' },
  'act7.rules': [
    { zh: { name: '明确的边界', desc: '清楚谁有权使用渔场', effect: '防止外来者搭便车' }, en: { name: 'Clear Boundaries', desc: 'Define who can use the fishery', effect: 'Prevent free-riders' } },
    { zh: { name: '本地化规则', desc: '规则由使用者自己制定', effect: '规则适应当地情况' }, en: { name: 'Local Rules', desc: 'Rules made by the users themselves', effect: 'Rules fit local conditions' } },
    { zh: { name: '集体决策', desc: '所有渔民参与规则制定', effect: '规则被大家接受' }, en: { name: 'Collective Choice', desc: 'All fishermen participate in rule-making', effect: 'Rules are accepted by everyone' } },
    { zh: { name: '监督机制', desc: '有人负责监督执行', effect: '降低偷捕的可能' }, en: { name: 'Monitoring', desc: 'Someone oversees enforcement', effect: 'Reduces poaching' } },
    { zh: { name: '渐进惩罚', desc: '违规者先警告、再罚款、再禁捕', effect: '威慑但不过度惩罚' }, en: { name: 'Graduated Sanctions', desc: 'First warning, then fines, then ban', effect: 'Deter without over-punishing' } },
    { zh: { name: '冲突解决', desc: '有低成本的争议解决途径', effect: '减少噪音/误解' }, en: { name: 'Conflict Resolution', desc: 'Low-cost dispute resolution', effect: 'Reduce noise/misunderstandings' } },
    { zh: { name: '自治权', desc: '政府不过度干预', effect: '保持本地灵活性' }, en: { name: 'Autonomy', desc: 'Government doesn\'t over-intervene', effect: 'Maintain local flexibility' } },
    { zh: { name: '多层治理', desc: '从村到省到国的嵌套制度', effect: '小公地嵌入大公地' }, en: { name: 'Nested Governance', desc: 'Village to province to nation', effect: 'Small commons nested in larger ones' } },
  ],
  'act7.game_terms': {
    zh: [
      '增加了重复博弈的轮数（渔民留在社区）',
      '降低了噪音（监督减少误解）',
      '提高了合作的收益（集体决策优化产出）',
      '增加了背叛的成本（渐进惩罚机制）',
      '引入了"守护号"角色（制度化的资源保护）',
    ],
    en: [
      'Increased rounds of repeated games (fishermen stay in community)',
      'Reduced noise (monitoring reduces misunderstandings)',
      'Increased payoff for cooperation (collective decisions optimize output)',
      'Increased cost of defection (graduated sanctions)',
      'Introduced "Guardian" role (institutional resource protection)',
    ],
  },
  'act7.game_term_prefix': { zh: '博弈论翻译：', en: 'Game theory translation: ' },
  'act7.applied': { zh: '🎉 制度设计正在改变游戏规则！', en: '🎉 Institutional design is changing the rules!' },
  'act7.conclusion1': { zh: '奥斯特罗姆证明了：<strong>公地悲剧不是注定的</strong>。<br>好的制度设计可以让合作成为均衡——<br>不需要把人变好，只需要把<em>游戏规则</em>变好。', en: 'Ostrom proved: <strong>the Tragedy of the Commons is not inevitable</strong>.<br>Good institutional design can make cooperation the equilibrium —<br>no need to make people better, just make the <em>rules</em> better.' },
  'act7.conclusion2': { zh: '了解了这些原则。<br>现在，<strong>你来设计自己的渔场规则</strong>！', en: 'Now you know the principles.<br>Now, <strong>design your own fishery rules</strong>!' },
  'act7.next': { zh: '进入沙盒模式 →', en: 'Enter Sandbox Mode →' },

  // === ACT 8 ===
  'act8.title': { zh: '第八章：沙盒模式', en: 'Chapter 8: Sandbox Mode' },
  'act8.subtitle': { zh: '自由调整所有参数，设计你自己的渔场——然后观察进化会发生什么。', en: 'Freely adjust all parameters, design your own fishery — then watch evolution unfold.' },
  'act8.pop_title': { zh: '🐟 初始种群', en: '🐟 Starting Population' },
  'act8.param_title': { zh: '⚙️ 参数', en: '⚙️ Parameters' },
  'act8.rounds': { zh: '博弈轮数', en: 'Rounds per match' },
  'act8.gens': { zh: '进化代数', en: 'Generations' },
  'act8.noise': { zh: '噪音率 %', en: 'Noise %' },
  'act8.scarcity': { zh: '稀缺溢价', en: 'Scarcity premium' },
  'act8.run': { zh: '▶ 运行模拟', en: '▶ Run Simulation' },
  'act8.running': { zh: '<em>模拟进行中……</em>', en: '<em>Simulation running...</em>' },
  'act8.result_title': { zh: '最终种群分布：', en: 'Final population:' },
  'act8.dominant': { zh: '主导了这个世界。', en: 'dominated this world.' },
  'act8.skip': { zh: '我玩够了，看看结论 →', en: 'I\'m done — see the conclusion →' },

  // === ACT 9 ===
  'act9.intro': { zh: '博弈论和奥斯特罗姆的研究告诉我们，<br>避免公地悲剧需要<strong>三个条件</strong>：', en: 'Game theory and Ostrom\'s research tell us<br>avoiding the Tragedy of the Commons requires <strong>three conditions</strong>:' },
  'act9.cond1.title': { zh: '1. 重复互动', en: '1. Repeated Interactions' },
  'act9.cond1.text': { zh: '信任需要时间来建立。<br>当渔民世代在同一片海域捕鱼——合作自然生长。<br>当工业渔船捞完就走——合作无从建立。', en: 'Trust takes time to build.<br>When fishermen fish the same waters for generations — cooperation grows naturally.<br>When trawlers catch and leave — cooperation never forms.' },
  'act9.cond2.title': { zh: '2. 双赢的可能', en: '2. Win-Win Possibilities' },
  'act9.cond2.text': { zh: '博弈必须是非零和的——<br>合作的总收益要大于互相竞争。<br>当补贴扭曲了收益结构，双赢就消失了。', en: 'The game must be non-zero-sum —<br>the total payoff of cooperation must exceed competition.<br>When subsidies distort incentives, win-win disappears.' },
  'act9.cond3.title': { zh: '3. 低噪音', en: '3. Low Noise' },
  'act9.cond3.text': { zh: '误解会摧毁合作。<br>透明的信息、清晰的沟通、<br>低成本的冲突解决——降低噪音。', en: 'Misunderstandings destroy cooperation.<br>Transparent information, clear communication,<br>low-cost conflict resolution — reduce noise.' },
  'act9.ostrom': { zh: '加上好的制度设计——奥斯特罗姆的八条原则——<br>公地悲剧<strong style="color:#f39c12">不是注定的</strong>。', en: 'Add good institutional design — Ostrom\'s eight principles —<br>and the Tragedy of the Commons <strong style="color:#f39c12">is not inevitable</strong>.' },
  'act9.rules': { zh: '游戏定义玩家的行为。<br>但长远来看——<strong>是我们定义游戏的规则。</strong>', en: 'Games define players\' behavior.<br>But in the long run — <strong>we define the rules of the game.</strong>' },
  'act9.real': {
    zh: '这不仅仅是关于鱼的故事。<br><br>大气层是我们的公地——气候变化。<br>海洋是我们的公地——过度捕捞。<br>互联网是我们的公地——注意力经济。<br>民主制度是我们的公地——公民参与。<br><br>每一个共享资源，都面临同样的博弈。<br>而解决方案的关键，不在于把人变得更好——<br>而在于<strong>设计更好的游戏规则</strong>。',
    en: 'This isn\'t just a story about fish.<br><br>The atmosphere is our commons — climate change.<br>The ocean is our commons — overfishing.<br>The internet is our commons — the attention economy.<br>Democracy is our commons — civic participation.<br><br>Every shared resource faces the same game.<br>And the key to the solution isn\'t making people better —<br>it\'s <strong>designing better rules</strong>.',
  },
  'act9.credits.title': { zh: '公地的进化', en: 'The Evolution of the Commons' },
  'act9.credits.by': { zh: 'Made by', en: 'Made by' },
  'act9.credits.inspired': { zh: '灵感来源于', en: 'Inspired by' },
  'act9.credits.source': { zh: 'GitHub 开源', en: 'Open Source on GitHub' },
  'act9.credits.refs': { zh: '参考文献：', en: 'References:' },

  // === STRATEGIES ===
  'strategy.greedy.name': { zh: '贪婪号', en: 'Greedy' },
  'strategy.greedy.desc': { zh: '每轮都过度捕捞，不管鱼群状态', en: 'Always overfishes, regardless of fish stock' },
  'strategy.moderate.name': { zh: '节制号', en: 'Moderate' },
  'strategy.moderate.desc': { zh: '每轮只捕安全量，永远不多捕', en: 'Only catches the safe amount, never more' },
  'strategy.copyfish.name': { zh: '模仿号', en: 'Copyfish' },
  'strategy.copyfish.desc': { zh: '第一轮节制，之后模仿对手上一轮的选择', en: 'Starts moderate, then mirrors opponent\'s last move' },
  'strategy.grudger.name': { zh: '记仇号', en: 'Grudger' },
  'strategy.grudger.desc': { zh: '节制捕捞，但一旦对方过度捕捞就永远过度', en: 'Moderate until betrayed, then overfishes forever' },
  'strategy.detective.name': { zh: '侦探号', en: 'Detective' },
  'strategy.detective.desc': { zh: '前4轮试探，如果对方从未报复则一直过度', en: 'Probes for 4 rounds, exploits if opponent never retaliates' },
  'strategy.forgiving.name': { zh: '宽容号', en: 'Forgiving' },
  'strategy.forgiving.desc': { zh: '类似模仿号，但容忍一次过度捕捞才报复', en: 'Like Copyfish, but tolerates one overfishing before retaliating' },
  'strategy.simpleton.name': { zh: '憨憨号', en: 'Simpleton' },
  'strategy.simpleton.desc': { zh: '上轮赚了就重复，亏了就换策略', en: 'Repeats if last round was good, switches if bad' },
  'strategy.random.name': { zh: '随机号', en: 'Random' },
  'strategy.random.desc': { zh: '随机决定捕捞量', en: 'Randomly decides how much to catch' },
  'strategy.guardian.name': { zh: '守护号', en: 'Guardian' },
  'strategy.guardian.desc': { zh: '根据鱼群状态动态调整：鱼多正常捕、鱼少减少、危险停捕', en: 'Adjusts based on fish stock: more fish → normal catch, fewer → reduce, critical → stop' },

  // === UI ===
  'ui.pond': { zh: '渔场', en: 'Fishery' },
  'ui.catch': { zh: '捕获 {n} 条', en: 'Caught {n}' },
  'ui.gen_prefix': { zh: '第', en: 'Gen ' },
  'ui.gen_suffix': { zh: '代', en: '' },

  // === NAV ===
  'nav.cover': { zh: '封面', en: 'Cover' },
  'nav.prologue': { zh: '序章', en: 'Prologue' },
  'nav.ch1': { zh: '第一章', en: 'Ch.1' },
  'nav.ch2': { zh: '第二章', en: 'Ch.2' },
  'nav.ch3': { zh: '第三章', en: 'Ch.3' },
  'nav.ch4': { zh: '第四章', en: 'Ch.4' },
  'nav.ch5': { zh: '第五章', en: 'Ch.5' },
  'nav.ch6': { zh: '第六章', en: 'Ch.6' },
  'nav.ch7': { zh: '第七章', en: 'Ch.7' },
  'nav.sandbox': { zh: '沙盒', en: 'Sandbox' },
  'nav.finale': { zh: '终章', en: 'Finale' },
};

let currentLang = localStorage.getItem('lang') || 'en';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  location.reload();
}

// Get translation by key
export function t(key) {
  const entry = translations[key];
  if (!entry) {
    // Try key.lang format
    const langKey = `${key}.${currentLang}`;
    return translations[langKey] || key;
  }
  if (typeof entry === 'string') return entry;
  return entry[currentLang] || entry.en || key;
}

// Get Ostrom rules (special array structure)
export function getOstromRules() {
  const rules = translations['act7.rules'];
  return rules.map(r => r[currentLang] || r.en);
}

// Get game terms (special array structure)
export function getGameTerms() {
  const terms = translations['act7.game_terms'];
  return terms[currentLang] || terms.en;
}
