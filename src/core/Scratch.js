// Scratch card interaction component

export function createScratchCard(contentHTML, width = '100%') {
  const wrapper = document.createElement('div');
  wrapper.className = 'scratch-container';
  wrapper.style.width = width;

  // Content underneath
  const content = document.createElement('div');
  content.className = 'scratch-content';
  content.innerHTML = contentHTML;
  wrapper.appendChild(content);

  // Canvas overlay
  const canvas = document.createElement('canvas');
  canvas.className = 'scratch-overlay';
  wrapper.appendChild(canvas);

  // Hint text
  const hint = document.createElement('div');
  hint.className = 'scratch-hint';
  hint.textContent = '👆 用鼠标刮开看看';
  wrapper.appendChild(hint);

  let revealed = false;
  let scratching = false;
  let resolvePromise;
  const promise = new Promise(r => { resolvePromise = r; });

  const setupCanvas = () => {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');

    // Draw silver overlay
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some texture
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2, 2
      );
    }

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
      hint.style.opacity = '0';
      checkReveal(ctx);
    };

    const checkReveal = (ctx) => {
      if (revealed) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparent++;
      }
      const ratio = transparent / (imageData.data.length / 4);
      if (ratio > 0.4) {
        revealed = true;
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.remove();
          hint.remove();
          resolvePromise();
        }, 500);
      }
    };

    // Mouse events
    canvas.addEventListener('mousedown', () => { scratching = true; });
    canvas.addEventListener('mouseup', () => { scratching = false; });
    canvas.addEventListener('mouseleave', () => { scratching = false; });
    canvas.addEventListener('mousemove', (e) => {
      if (!scratching) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    });

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      scratching = true;
    });
    canvas.addEventListener('touchend', () => { scratching = false; });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    });
  };

  // Setup after mounting
  requestAnimationFrame(() => {
    requestAnimationFrame(setupCanvas);
  });

  wrapper._promise = promise;
  return wrapper;
}
