const themeBtn = document.querySelector("#themeButton");
const themeName = document.querySelector("#themeName");
//very very colorful, hehe
const themes = {
    dark: { bg: "#0a0a0a", text: "#f5f5f5", buttonbg: "#171717", border: "#262626" },
    light: { bg: "#f5f5f5", text: "#0a0a0a", buttonbg: "#e5e5e5", border: "#d4d4d4" },
    red: { bg: "#2a0a0a", text: "#ffe2e2", buttonbg: "#82181a", border: "#9f0712" },
    purple: { bg: "#1e0a2a", text: "#f3e8ff", buttonbg: "#59168b", border: "#6e11b0" },
    green: { bg: "#0a2a0a", text: "#dcfce7", buttonbg: "#0d542b", border: "#026630" },
    fuchsia: { bg: "#2a0a2a", text: "#ffe2ff", buttonbg: "#8b158b", border: "#b00cb0" },
    lime: { bg: "#2a2a0a", text: "#f5ffe5", buttonbg: "#868b15", border: "#b0b00d" },
    orange: { bg: "#2a140a", text: "#fff0e5", buttonbg: "#8b4515", border: "#b06e0d" },
    rose: { bg: "#2a0a14", text: "#fff0f5", buttonbg: "#8b1545", border: "#b00d3b" },
    blue: { bg: "#0a1e2a", text: "#e5f5ff", buttonbg: "#15468b", border: "#0d6eb0" },
};

const themeKeys = Object.keys(themes);
let currentThemeIndex = 0;

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
    localStorage.setItem("theme", themeName);
}

function render() {
    const currentTheme = themeKeys[currentThemeIndex];
    themeName.innerText = currentTheme;
    applyTheme(currentTheme);
}

function setThemeByIndex(index) {
    currentThemeIndex = index;
    render();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && !(e.shiftKey) && !(e.ctrlKey)) {
        setThemeByIndex((currentThemeIndex + 1) % themeKeys.length);
    }
    if (e.key === "ArrowLeft" && !(e.shiftKey) && !(e.ctrlKey)) {
        setThemeByIndex((currentThemeIndex - 1 + themeKeys.length) % themeKeys.length);
    }
    if ((e.key).toLowerCase() === "d") setThemeByIndex(themeKeys.indexOf("dark"));
    if ((e.key).toLowerCase() === "l") setThemeByIndex(themeKeys.indexOf("light"));
});

themeBtn.addEventListener("click", () => {
    setThemeByIndex((currentThemeIndex + 1) % themeKeys.length);
});

(function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && themes[savedTheme]) {
        currentThemeIndex = themeKeys.indexOf(savedTheme);
        applyTheme(savedTheme);
    } else {
        applyTheme(themeKeys[currentThemeIndex]);
    }
})();

render();     //localStorage ke liye AI use kiya hai only, to understand better, hehe