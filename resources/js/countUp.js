const initCountUp = () => {
  const elements = document.querySelectorAll('[data-count]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      observer.unobserve(el);

      const target = parseFloat(el.textContent);
      if (isNaN(target)) return;

      const isDecimal = target % 1 !== 0;
      const duration = 1500;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        el.textContent = isDecimal
          ? current.toFixed(1)
          : Math.round(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      el.textContent = isDecimal ? '0.0' : '0';
      requestAnimationFrame(step);
    });
  }, { threshold: 1, rootMargin: '0px 0px 20% 0px' });

  elements.forEach((el) => observer.observe(el));
};

export default initCountUp;
