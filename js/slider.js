document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach(slider => {
        const track = slider.querySelector('.slider__track');
        const slides = [...slider.querySelectorAll('.slide')];
        const prev = slider.querySelector('.slider__btn--prev');
        const next = slider.querySelector('.slider__btn--next');
        const dots = [...slider.querySelectorAll('.dot')];

        if (!track || slides.length === 0) return;

        let index = 0;

        function update() {
            const step = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            track.style.transform = `translateX(-${index * (step + gap)}px)`;
            dots.forEach((d, i) => d.classList.toggle('dot--active', i === index));
        }

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            update();
        }

        prev?.addEventListener('click', () => goTo(index - 1));
        next?.addEventListener('click', () => goTo(index + 1));
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

        window.addEventListener('resize', update);
        update();
    });
});