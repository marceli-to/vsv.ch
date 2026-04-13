const initMemberChart = () => {
  const el = document.querySelector('[data-membership-chart]');
  if (!el) return;

  const bars = el.querySelectorAll('[data-bar]');
  if (!bars.length) return;

  let maxTotal = 0;
  bars.forEach((bar) => {
    const total =
      parseInt(bar.dataset.active || 0) +
      parseInt(bar.dataset.partner || 0) +
      parseInt(bar.dataset.individual || 0);
    if (total > maxTotal) maxTotal = total;
  });

  if (!maxTotal) return;

  const animate = () => {
    bars.forEach((bar, index) => {
      const active = parseInt(bar.dataset.active || 0);
      const partner = parseInt(bar.dataset.partner || 0);
      const individual = parseInt(bar.dataset.individual || 0);

      const staggerDelay = index * 150;

      setTimeout(() => {
        const segments = bar.querySelectorAll('[data-segment]');
        segments.forEach((segment) => {
          let value = 0;
          switch (segment.dataset.segment) {
            case 'individual':
              value = individual;
              break;
            case 'partner':
              value = partner;
              break;
            case 'active':
              value = active;
              break;
          }
          const pct = (value / maxTotal) * 100;
          segment.style.height = pct + '%';
        });
      }, staggerDelay);

      setTimeout(() => {
        bar.querySelectorAll('[data-label]').forEach((label) => {
          label.style.opacity = '1';
        });
      }, staggerDelay + 800);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(el);
};

export default initMemberChart;
