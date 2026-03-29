import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initGallery = () => {
  document.querySelectorAll('.gallery-outer').forEach((outerEl) => {
    // Collect original slides (before loop cloning)
    const originalSlides = Array.from(outerEl.querySelectorAll('.swiper-wrapper > .swiper-slide'));

    // Init inner swipers on original slides only
    const innerSwipers = [];
    originalSlides.forEach((slide) => {
      const innerEl = slide.querySelector('.gallery-inner');
      if (innerEl) {
        const inner = new Swiper(innerEl, {
          modules: [Pagination],
          nested: true,
          slidesPerView: 1,
          pagination: {
            el: innerEl.querySelector('.swiper-pagination'),
            clickable: true,
          },
        });
        innerSwipers.push(inner);
      }
    });

    const wrapper = outerEl.closest('.gallery-wrapper');
    const paginationOuter = wrapper.querySelector('.gallery-pagination-outer');

    const syncPagination = (realIndex) => {
      const swiper = innerSwipers[realIndex];
      paginationOuter.innerHTML = '';
      if (swiper && swiper.pagination && swiper.pagination.el) {
        Array.from(swiper.pagination.el.children).forEach((bullet, i) => {
          const clone = bullet.cloneNode(true);
          clone.addEventListener('click', () => {
            swiper.slideTo(i);
            syncPagination(realIndex);
          });
          paginationOuter.appendChild(clone);
        });
      }
    };

    // Init outer swiper
    new Swiper(outerEl, {
      modules: [Navigation],
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 16,
      navigation: {
        nextEl: wrapper.querySelector('.gallery-next'),
        prevEl: wrapper.querySelector('.gallery-prev'),
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
          syncPagination(this.realIndex);
        },
        afterInit: function () {
          requestAnimationFrame(() => syncPagination(this.realIndex));
        },
      },
    });

    // Keep cloned pagination in sync when inner slides change
    innerSwipers.forEach((swiper, i) => {
      swiper.on('slideChange', () => {
        const outerSwiper = outerEl.swiper;
        if (outerSwiper && outerSwiper.realIndex === i) {
          syncPagination(i);
        }
      });
    });
  });
};

export default initGallery;
