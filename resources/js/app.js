import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import countUp from './countUp';
import membershipChart from './membershipChart';

Alpine.plugin(collapse);
Alpine.data('membershipChart', membershipChart);
window.Alpine = Alpine;
Alpine.start();

countUp();
