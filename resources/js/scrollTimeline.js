const initScrollTimeline = () => {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  const fill = timeline.querySelector('[data-timeline-fill]');
  const dots = timeline.querySelectorAll('[data-timeline-dot]');
  const triggerRatio = 0.6;

  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const triggerY = window.innerHeight * triggerRatio;

    // Grow the fill line to match the scroll position within the timeline
    const fillPx = Math.min(rect.height, Math.max(0, triggerY - rect.top));
    fill.style.height = fillPx + 'px';

    // Activate dots once the fill line passes them
    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const dotCenter = dotRect.top + dotRect.height / 2;
      const isActive = dotCenter < triggerY;
      dot.toggleAttribute('data-active', isActive);
      dot.closest('[data-timeline-entry]').toggleAttribute('data-active', isActive);
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
};

export default initScrollTimeline;
