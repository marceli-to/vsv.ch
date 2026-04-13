import ScrollReveal from 'scrollreveal';

const initTimeline = () => {
  const entries = document.querySelectorAll('[data-timeline-entry]');
  if (!entries.length) return;

  ScrollReveal().reveal('[data-timeline-entry]', {
    origin: 'bottom',
    distance: '1.5rem',
    duration: 1200,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    interval: 240,
    viewFactor: 0.75,
  });
};

export default initTimeline;
