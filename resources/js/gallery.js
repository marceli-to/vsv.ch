import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initGallery = () => {
  document.querySelectorAll('.gallery-outer').forEach((outerEl) => {
    // Init inner swipers first
    const innerSwipers = [];
    outerEl.querySelectorAll('.gallery-inner').forEach((innerEl) => {
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
    });

    // Init outer swiper
    new Swiper(outerEl, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      initialSlide: 1,
      centeredSlides: true,
      spaceBetween: 16,
      pagination: {
        el: outerEl.closest('.gallery-wrapper').querySelector('.gallery-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: outerEl.closest('.gallery-wrapper').querySelector('.gallery-next'),
        prevEl: outerEl.closest('.gallery-wrapper').querySelector('.gallery-prev'),
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
      },
      on: {
        slideChange: function () {
          // Update inner swipers when outer slide changes
          innerSwipers.forEach((s) => s.update());
        },
      },
    });
  });
};

export default initGallery;
