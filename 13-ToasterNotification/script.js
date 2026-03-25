// I have to explore how closure works

function toast(config) {
    return function (str) {
        let parent = document.querySelector("#toastParent");
        let div = document.createElement("div");
        div.className = `toast inline-block px-4 py-2 rounded-lg pointer-events-none ${config.theme === "dark" ? "bg-neutral-800 text-neutral-100" : "bg-neutral-100 text-neutral-900"}`;
        div.textContent = str;
        div.style.setProperty("--toast-stay", `${Math.max(0.1, config.duration - 0.25)}s`);
        parent.appendChild(div);
        parent.className = "fixed z-50 p-10 gap-2 items-end bottom-5 right-5 flex flex-col w-fit";

        if (config.PositionX !== "right" || config.PositionY !== "bottom") {
            parent.className += `${config.PositionX === "left" ? " left-5 items-start" : " right-5 items-end"} ${config.PositionY === "top" ? " top-5" : " bottom-5"}`;
        }

        setTimeout(() => {
            if (parent.contains(div)) {
                parent.removeChild(div);
            }
        }, config.duration * 1000 + 250);
    }
}

let toaster = toast({
    duration: 3,
    theme: "dark",
    PositionX: "right",
    PositionY: "bottom",
});

document.querySelector("button").addEventListener("click", () => {
    toaster(`Download Done`)
});