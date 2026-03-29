import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initGallery = () => {
  document.querySelectorAll('[data-gallery-outer]').forEach((outerEl) => {
    const wrapper = outerEl.closest('[data-gallery]');
    if (!wrapper) return;

    const paginationOuter = wrapper.querySelector('[data-gallery-pagination]');
    const innerSwipers = [];

    outerEl.querySelectorAll('[data-gallery-inner]').forEach((innerEl) => {
      const inner = new Swiper(innerEl, {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: innerEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });

      innerSwipers.push(inner);
    });

    const syncPagination = (activeIndex) => {
      if (!paginationOuter) return;

      const swiper = innerSwipers[activeIndex];
      paginationOuter.replaceChildren();

      if (!swiper?.pagination?.el) return;

      Array.from(swiper.pagination.el.children).forEach((bullet, i) => {
        const clone = bullet.cloneNode(true);
        clone.addEventListener('click', () => {
          swiper.slideTo(i);
        });
        paginationOuter.appendChild(clone);
      });
    };

    const equalizeCaptions = () => {
      const captions = wrapper.querySelectorAll('[data-gallery-caption]');
      if (!captions.length) return;

      captions.forEach((el) => {
        el.style.minHeight = '';
      });

      let max = 0;
      captions.forEach((el) => {
        max = Math.max(max, el.offsetHeight);
      });

      captions.forEach((el) => {
        el.style.minHeight = `${max}px`;
      });
    };

    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(equalizeCaptions);
    };

    window.addEventListener('resize', onResize);

    const outerSwiper = new Swiper(outerEl, {
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
        slideChange() {
          innerSwipers.forEach((swiper) => swiper.update());
          syncPagination(this.activeIndex);
        },
        afterInit() {
          requestAnimationFrame(() => {
            syncPagination(this.activeIndex);
            equalizeCaptions();
          });
        },
      },
    });

    innerSwipers.forEach((swiper, i) => {
      swiper.on('slideChange', () => {
        if (outerSwiper.activeIndex === i) {
          syncPagination(i);
        }
      });
    });
  });
};

export default initGallery;