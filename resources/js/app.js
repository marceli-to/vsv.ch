import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import initCountUp from './countUp';
import initMemberChart from './memberChart';
import initGallery from './gallery';
import initTimeline from './timeline';

Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();

initCountUp();
initMemberChart();
initGallery();
initTimeline();
