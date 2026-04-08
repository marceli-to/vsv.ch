import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initGallery = () => {
  document.querySelectorAll('[data-gallery-outer]').forEach((outerEl) => {
    const wrapper = outerEl.closest('[data-gallery]');
    if (!wrapper) return;

    const paginationEl = wrapper.querySelector('[data-gallery-pagination]');

    new Swiper(outerEl, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 16,
      navigation: {
        nextEl: wrapper.querySelector('[data-gallery-next]'),
        prevEl: wrapper.querySelector('[data-gallery-prev]'),
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
      },
    });
  });
};

export default initGallery;
