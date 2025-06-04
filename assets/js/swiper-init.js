document.addEventListener("DOMContentLoaded", function () {
    const swipers = document.querySelectorAll('.swiper-container');
    swipers.forEach(function(swiperElement) {
        const swiper = new Swiper(swiperElement, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            autoHeight: true,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            keyboard: {
                enabled: true,
            },
            a11y: {
                prevSlideMessage: '前のスライド',
                nextSlideMessage: '次のスライド',
                firstSlideMessage: '最初のスライド',
                lastSlideMessage: '最後のスライド',
                paginationBulletMessage: 'スライド {{index}}へ移動',
            },
            on: {
                init: function () {
                    setTimeout(() => {
                        this.update();
                    }, 100);
                }
            }
        });
    });
});
