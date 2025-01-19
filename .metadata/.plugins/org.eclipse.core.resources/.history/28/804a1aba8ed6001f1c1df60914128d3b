document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector('.slides');

    // 슬라이드 요소가 존재하는지 확인
    if (!slides) {
        console.error("슬라이드 요소를 찾을 수 없습니다.");
        return;
    }

    const slideCount = slides.children.length;
    let currentIndex = 0;

    // 슬라이드의 위치를 업데이트하는 함수
    const updateSlidePosition = () => {
        const slideWidth = slides.children[0].clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    // 다음 슬라이드를 표시하는 함수
    const showNextSlide = () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlidePosition();
    };

    // 이전 슬라이드를 표시하는 함수
    const showPrevSlide = () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlidePosition();
    };

    // 자동 슬라이드 (7초 간격)
    setInterval(showNextSlide, 7000);

    // 슬라이드의 크기가 변경될 때마다 슬라이드 위치를 업데이트하는 리스너 추가
    window.addEventListener('resize', updateSlidePosition);
});
