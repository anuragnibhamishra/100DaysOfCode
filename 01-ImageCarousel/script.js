const carousel = document.querySelector("#carousel");

const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

let index = 0;

const imageArray = [
    "https://picsum.photos/id/1015/700/400",
    "https://picsum.photos/id/1016/700/400",
    "https://picsum.photos/id/1018/700/400",
    "https://picsum.photos/id/1019/700/400",
    "https://picsum.photos/id/1020/700/400",
    "https://picsum.photos/id/1023/700/400",
    "https://picsum.photos/id/1032/700/400",
    "https://picsum.photos/id/1033/700/400",
    "https://picsum.photos/id/1036/700/400",
    "https://picsum.photos/id/1065/700/400",
    "https://picsum.photos/id/1067/700/400",
    "https://picsum.photos/id/1078/700/400",
    "https://picsum.photos/id/1079/700/400",
    "https://picsum.photos/id/1080/700/400",
    "https://picsum.photos/id/1082/700/400",
    "https://picsum.photos/id/1008/700/400",
    "https://picsum.photos/id/1009/700/400",
    "https://picsum.photos/id/1006/700/400",
    "https://picsum.photos/id/1005/700/400",
    "https://picsum.photos/id/1004/700/400",
    "https://picsum.photos/id/1003/700/400",
    "https://picsum.photos/id/1002/700/400",
    "https://picsum.photos/id/1001/700/400"
];

const total = imageArray.length;

imageArray.forEach(src => {

    const img = document.createElement("img");

    img.className = "w-full shrink-0";
    img.src = src;

    carousel.appendChild(img);

});

function updateCarousel() {

    carousel.style.transform = `translateX(-${index * 100}%)`;

}

nextBtn.addEventListener("click", () => {

    index = (index + 1) % total;

    updateCarousel();

});

prevBtn.addEventListener("click", () => {

    index = (index - 1 + total) % total;

    updateCarousel();

});
let interval;

function startAuto() {
    interval = setInterval(() => {
        index = (index + 1) % total;
        updateCarousel();
    }, 5000);
}

function stopAuto() {
    clearInterval(interval);
}

carousel.addEventListener("mouseenter", stopAuto);
carousel.addEventListener("mouseleave", startAuto);