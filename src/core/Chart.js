// Simple canvas chart component

export function createLineChart(data, options = {}) {
  const {
    width = 560,
    height = 230,
    labels = [],
    annotations = [],
    color = '#4da8da',
    bgColor = 'rgba(255,255,255,0.05)',
    animate = true,
    yLabel = '',
    xLabel = '',
  } = options;

  const container = document.createElement('div');
  container.className = 'chart-container';

  const canvas = document.createElement('canvas');
  canvas.width = width * 2; // Retina
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2); // Retina

  const padding = { top: 20, right: 20, bottom: 35, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data) * 1.1;
  const minVal = 0;

  const xScale = (i) => padding.left + (i / (data.length - 1)) * chartW;
  const yScale = (v) => padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  let resolvePromise;
  const promise = new Promise(r => { resolvePromise = r; });

  const drawFrame = (progress = 1) => {
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(padding.left, padding.top, chartW, chartH);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();

      // Y labels
      const val = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val, padding.left - 8, y + 4);
    }

    // Y axis label
    if (yLabel) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px sans-serif';
      ctx.translate(12, padding.top + chartH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(yLabel, 0, 0);
      ctx.restore();
    }

    // Draw line
    const pointsToShow = Math.floor(data.length * progress);
    if (pointsToShow < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';

    for (let i = 0; i < pointsToShow; i++) {
      const x = xScale(i);
      const y = yScale(data[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill under line
    ctx.lineTo(xScale(pointsToShow - 1), padding.top + chartH);
    ctx.lineTo(xScale(0), padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = color.replace(')', ',0.1)').replace('rgb', 'rgba');
    ctx.fill();

    // X labels
    if (labels.length > 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      const step = Math.max(1, Math.floor(labels.length / 6));
      for (let i = 0; i < labels.length; i += step) {
        if (i < pointsToShow) {
          ctx.fillText(labels[i], xScale(i), padding.top + chartH + 18);
        }
      }
    }

    // Annotations
    annotations.forEach(({ index, text: annText, color: annColor }) => {
      if (index >= pointsToShow) return;
      const x = xScale(index);
      const y = yScale(data[index]);

      // Dot
      ctx.beginPath();
      ctx.fillStyle = annColor || '#f39c12';
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = annColor || '#f39c12';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(annText, x, y - 12);
    });
  };

  if (animate) {
    let frame = 0;
    const totalFrames = 120;
    const step = () => {
      frame++;
      const progress = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      drawFrame(eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolvePromise();
      }
    };
    // Start animation after a brief delay
    setTimeout(() => requestAnimationFrame(step), 300);
  } else {
    drawFrame(1);
    resolvePromise();
  }

  container._promise = promise;
  container._redraw = drawFrame;
  return container;
}

// Stacked area chart for evolution
export function createEvolutionChart(historyData, strategies, options = {}) {
  const {
    width = 560,
    height = 280,
  } = options;

  const container = document.createElement('div');
  container.className = 'evo-container';

  const canvas = document.createElement('canvas');
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  const padding = { top: 20, right: 20, bottom: 35, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const draw = (frameCount = historyData.length) => {
    const data = historyData.slice(0, frameCount);
    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    const totalPerGen = data[0].reduce((a, b) => a + b, 0);
    const gens = data.length;

    const xScale = (i) => padding.left + (i / (gens - 1)) * chartW;
    const yScale = (v) => padding.top + chartH - (v / totalPerGen) * chartH;

    // Draw stacked areas
    for (let s = strategies.length - 1; s >= 0; s--) {
      ctx.beginPath();
      ctx.fillStyle = strategies[s].color + '80';
      ctx.strokeStyle = strategies[s].color;
      ctx.lineWidth = 1;

      // Bottom edge (cumulative of strategies below)
      for (let g = 0; g < gens; g++) {
        const cumBelow = data[g].slice(0, s).reduce((a, b) => a + b, 0);
        const cumThis = cumBelow + data[g][s];
        const x = xScale(g);
        const y = yScale(cumThis);
        if (g === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Top edge (going back)
      for (let g = gens - 1; g >= 0; g--) {
        const cumBelow = data[g].slice(0, s).reduce((a, b) => a + b, 0);
        ctx.lineTo(xScale(g), yScale(cumBelow));
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // X axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    const step = Math.max(1, Math.floor(gens / 8));
    for (let i = 0; i < gens; i += step) {
      ctx.fillText(`第${i}代`, xScale(i), padding.top + chartH + 18);
    }

    // Y axis
    ctx.textAlign = 'right';
    ctx.fillText('0', padding.left - 8, padding.top + chartH + 4);
    ctx.fillText(totalPerGen, padding.left - 8, padding.top + 10);

    // Legend
    const legendY = 8;
    let legendX = padding.left;
    strategies.forEach((s, i) => {
      if (data[data.length - 1][i] === 0 && data[0][i] === 0) return;
      ctx.fillStyle = s.color;
      ctx.fillRect(legendX, legendY, 10, 10);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(s.name, legendX + 14, legendY + 9);
      legendX += ctx.measureText(s.name).width + 28;
    });
  };

  container._draw = draw;
  container._animate = (onFrame) => {
    let frame = 0;
    const step = () => {
      frame++;
      if (frame <= historyData.length) {
        draw(frame);
        if (onFrame) onFrame(frame, historyData.length);
        setTimeout(step, 200);
      }
    };
    step();
  };

  return container;
}

// Bar chart for tournament results
export function createBarChart(items, options = {}) {
  const { maxWidth = 500 } = options;
  const container = document.createElement('div');
  container.className = 'tournament-bar';

  const maxScore = Math.max(...items.map(i => i.score));

  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'bar-row';

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = `${item.icon || ''} ${item.name}`;
    row.appendChild(label);

    const track = document.createElement('div');
    track.className = 'bar-track';

    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.background = item.color || '#4da8da';
    fill.style.width = '0%';
    fill.textContent = Math.round(item.score * 10) / 10;
    track.appendChild(fill);
    row.appendChild(track);

    container.appendChild(row);

    // Animate
    setTimeout(() => {
      fill.style.width = `${(item.score / maxScore) * 100}%`;
    }, 200 + index * 100);
  });

  return container;
}
