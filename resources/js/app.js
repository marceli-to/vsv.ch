import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import countUp from './countUp';

Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();

countUp();
