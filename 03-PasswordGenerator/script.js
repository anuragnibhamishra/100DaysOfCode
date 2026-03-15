const charGroups = {
    lowercases: "abcdefghijklmnopqrstuvwxyz",
    uppercases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%&*+-_"
};
const GenerateButton = document.querySelector("#generateButton");
const passwordDisplay = document.querySelector("#password");
function passwordGenerator(length = 14) {
    let finalCollection = "";
    for (const group in charGroups) {
        const checkbox = document.querySelector(`#${group}`);
        if (checkbox.checked) {
            finalCollection += charGroups[group];
        }
    }

    const passwordLength = length;
    let password = "";
    
    if (finalCollection.length === 0) {
        return "Please select at least one character type.";
    } else {
        for (let i = 0; i < passwordLength; i++) {
        const randomChar = finalCollection[Math.floor(Math.random() * finalCollection.length)];
        password += randomChar;
    }
    }

    return password;
}

GenerateButton.addEventListener("click", () => {
    const passwordGenerated = passwordGenerator();
    passwordDisplay.textContent = passwordGenerated;
});

const copyBtn = document.querySelector("#copyBtn");
copyBtn.addEventListener("click", () => {
    const password = passwordDisplay.textContent;
    navigator.clipboard.writeText(password);
});