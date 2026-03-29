import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initGallery = () => {
  document.querySelectorAll('[data-gallery-outer]').forEach((outerEl) => {
    const innerSwipers = [];
    outerEl.querySelectorAll('[data-gallery-inner]').forEach((innerEl) => {
      const inner = new Swiper(innerEl, {
        modules: [Pagination],
        slidesPerView: 1,
        pagination: {
          el: innerEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });
      innerSwipers.push(inner);
    });

    const wrapper = outerEl.closest('[data-gallery]');
    const paginationOuter = wrapper.querySelector('[data-gallery-pagination]');

    const syncPagination = (activeIndex) => {
      const swiper = innerSwipers[activeIndex];
      paginationOuter.innerHTML = '';
      if (swiper && swiper.pagination && swiper.pagination.el) {
        Array.from(swiper.pagination.el.children).forEach((bullet, i) => {
          const clone = bullet.cloneNode(true);
          clone.addEventListener('click', () => {
            swiper.slideTo(i);
            syncPagination(activeIndex);
          });
          paginationOuter.appendChild(clone);
        });
      }
    };

    new Swiper(outerEl, {
      modules: [Navigation],
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 16,
      navigation: {
        nextEl: wrapper.querySelector('[data-gallery-next]'),
        prevEl: wrapper.querySelector('[data-gallery-prev]'),
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
      },
      on: {
        slideChange: function () {
          innerSwipers.forEach((s) => s.update());
          syncPagination(this.activeIndex);
        },
        afterInit: function () {
          requestAnimationFrame(() => syncPagination(this.activeIndex));
        },
      },
    });

    innerSwipers.forEach((swiper, i) => {
      swiper.on('slideChange', () => {
        const outerSwiper = outerEl.swiper;
        if (outerSwiper && outerSwiper.activeIndex === i) {
          syncPagination(i);
        }
      });
    });
  });
};

export default initGallery;
