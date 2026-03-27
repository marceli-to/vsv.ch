const membershipChart = () => ({
  init() {
    const bars = this.$el.querySelectorAll('[data-bar]');
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

    bars.forEach((bar) => {
      const active = parseInt(bar.dataset.active || 0);
      const partner = parseInt(bar.dataset.partner || 0);
      const individual = parseInt(bar.dataset.individual || 0);

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
    });
  },
});

export default membershipChart;
