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

    const wrapper = outerEl.closest('.gallery-wrapper');
    const paginationOuter = wrapper.querySelector('.gallery-pagination-outer');

    const updatePagination = (activeIndex) => {
      // Hide all inner paginations, show only the active one
      outerEl.querySelectorAll('.gallery-inner .swiper-pagination').forEach((el, i) => {
        el.style.display = i === activeIndex ? '' : 'none';
      });
      // Move active pagination into the outer container
      const activePagination = outerEl.querySelectorAll('.gallery-inner .swiper-pagination')[activeIndex];
      if (activePagination) {
        paginationOuter.innerHTML = '';
        paginationOuter.appendChild(activePagination);
      }
    };

    // Init outer swiper
    new Swiper(outerEl, {
      modules: [Navigation],
      slidesPerView: 1,
      initialSlide: 1,
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
          updatePagination(this.activeIndex);
        },
        afterInit: function () {
          updatePagination(this.activeIndex);
        },
      },
    });
  });
};

export default initGallery;
