const initPieChart = () => {
  const charts = document.querySelectorAll('[data-pie-chart]');
  charts.forEach((chart) => {
    const segmentEls = chart.querySelectorAll('[data-pie-segment]');
    if (!segmentEls.length) return;

    const segments = Array.from(segmentEls).map((el) => ({
      color: el.dataset.color,
      percentage: parseFloat(el.dataset.percentage),
    }));

    const disc = chart.querySelector('[data-pie-disc]');
    const labels = chart.querySelectorAll('[data-pie-label]');
    if (!disc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animateChart(disc, segments, labels);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(chart);

    window.addEventListener('resize', () => {
      if (!disc.style.background || disc.style.background === 'conic-gradient(transparent 0% 100%)') return;
      const newCx = disc.offsetWidth / 2;
      const newCy = disc.offsetHeight / 2;
      const newRadius = newCx * 0.65;
      positionLabels(segments, labels, newCx, newCy, newRadius);
    });
  });

};

const colorMap = {
  sky: 'var(--color-sky)',
  mist: 'var(--color-mist)',
  sand: 'var(--color-sand)',
  blush: 'var(--color-blush)',
  crimson: 'var(--color-crimson)',
  gold: 'var(--color-gold)',
};

const animateChart = (disc, segments, labels) => {
  const duration = 1200;
  const start = performance.now();
  const cx = disc.offsetWidth / 2;
  const cy = disc.offsetHeight / 2;
  const radius = cx * 0.65;

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    let parts = [];
    let cumulative = 0;

    segments.forEach((seg) => {
      const pct = seg.percentage * eased;
      const from = cumulative;
      cumulative += pct;
      const color = colorMap[seg.color] || `var(--color-${seg.color})`;
      parts.push(`${color} ${from}% ${cumulative}%`);
    });

    if (cumulative < 100) {
      parts.push(`transparent ${cumulative}% 100%`);
    }

    disc.style.background = `conic-gradient(${parts.join(', ')})`;

    if (progress >= 1) {
      positionLabels(segments, labels, cx, cy, radius);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const positionLabels = (segments, labels, cx, cy, radius) => {
  let cumulative = 0;

  segments.forEach((seg, i) => {
    const midAngle = cumulative + seg.percentage / 2;
    cumulative += seg.percentage;

    const angle = (midAngle / 100) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);

    if (labels[i]) {
      labels[i].style.left = x + 'px';
      labels[i].style.top = y + 'px';
      labels[i].style.opacity = '1';
      labels[i].style.transition = 'opacity 400ms ease';
    }
  });
};

export default initPieChart;
