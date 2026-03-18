const button = document.querySelector("#mainBtn");
const content = document.querySelector("#btnContent");

button.addEventListener("mousemove", function stickyDiv(e) {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    content.style.transform = `translate(${x}px, ${y}px)`;
});

button.addEventListener("mouseleave", () => {
    content.style.transform = `translate(0px, 0px)`;
});