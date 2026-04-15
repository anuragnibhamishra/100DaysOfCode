const imageInput = document.getElementById("imageInput");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
const presetsToggle = document.getElementById("presetsToggle");
const presetsPanel = document.getElementById("presetsPanel");
const image = document.getElementById("mainImage");
const placeholder = document.querySelector(".placeholder");
const filters = document.querySelectorAll(".filter input");

function updateSliderBackground(slider) {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #9810fa ${value}%, #444 ${value}%)`;
}

function updateSliderBackgrounds() {
    filters.forEach(updateSliderBackground);
}

let presets = {
    cinematic: {
        brightness: 90,
        contrast: 120,
        saturation: 110,
        hueRotate: 0,
        exposure: 95,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 85,
        saturation: 80,
        hueRotate: 10,
        exposure: 100,
        blur: 0,
        grayscale: 10,
        sepia: 60,
        invert: 0
    },

    vibrant: {
        brightness: 110,
        contrast: 115,
        saturation: 150,
        hueRotate: 0,
        exposure: 110,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0
    },

    cool: {
        brightness: 95,
        contrast: 105,
        saturation: 90,
        hueRotate: 180,
        exposure: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0
    },

    bw: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotate: 0,
        exposure: 100,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        invert: 0
    },

    soft: {
        brightness: 115,
        contrast: 80,
        saturation: 90,
        hueRotate: 0,
        exposure: 110,
        blur: 2,
        grayscale: 10,
        sepia: 10,
        invert: 0
    },

    dramatic: {
        brightness: 95,
        contrast: 140,
        saturation: 110,
        hueRotate: 0,
        exposure: 95,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0
    },

    inverted: {
        brightness: 100,
        contrast: 100,
        saturation: 120,
        hueRotate: 180,
        exposure: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 100
    }
};

function applyFilters() {
    const brightness = Number(filters[0].value);
    const contrast = Number(filters[1].value);
    const hueRotate = Number(filters[2].value);
    const exposure = Number(filters[3].value);
    const blur = Number(filters[4].value);
    const saturation = Number(filters[5].value);
    const grayscale = Number(filters[6].value);
    const sepia = Number(filters[7].value);
    const invert = Number(filters[8].value);

    const brightnessTotal = (brightness * exposure) / 100;
    image.style.filter = `brightness(${brightnessTotal}%) contrast(${contrast}%) hue-rotate(${hueRotate}deg) blur(${blur}px) saturate(${saturation}%) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%)`;
}

function resetFilters() {
    filters.forEach((filter) => {
        filter.value = filter.defaultValue;
        updateSliderBackground(filter);
    });
    applyFilters();
}

function showSelectedImage(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    image.src = url;
    image.onload = () => {
        placeholder.classList.add("hidden");
        image.classList.remove("hidden");
        applyFilters();
        URL.revokeObjectURL(url);
    };
}

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    showSelectedImage(file);
});

filters.forEach((filter) => {
    updateSliderBackground(filter);
    filter.addEventListener("input", () => {
        updateSliderBackground(filter);
        applyFilters();
    });
});

resetBtn.addEventListener("click", () => {
    resetFilters();
});

presetsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    presetsPanel.classList.toggle("hidden");
    presetsPanel.classList.toggle("flex");
});

presetsPanel.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.addEventListener("click", () => {
    if (!presetsPanel.classList.contains("hidden")) {
        presetsPanel.classList.add("hidden");
        presetsPanel.classList.remove("flex");
    }
});

presetsPanel.querySelectorAll("button[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
        const presetName = button.dataset.preset;
        const preset = presets[presetName];
        if (!preset) return;

        filters[0].value = preset.brightness;
        filters[1].value = preset.contrast;
        filters[2].value = preset.hueRotate;
        filters[3].value = preset.exposure;
        filters[4].value = preset.blur;
        filters[5].value = preset.saturation;
        filters[6].value = preset.grayscale;
        filters[7].value = preset.sepia;
        filters[8].value = preset.invert;

        filters.forEach(updateSliderBackground);
        applyFilters();
        presetsPanel.classList.add("hidden");
        presetsPanel.classList.remove("flex")
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !presetsPanel.classList.contains("hidden")) {
        presetsPanel.classList.add("hidden");
        presetsPanel.classList.remove("flex");
    }
});

updateSliderBackgrounds();