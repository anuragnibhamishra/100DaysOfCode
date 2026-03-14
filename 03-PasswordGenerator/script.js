const charGroups = {
    lowercases: "abcdefghijklmnopqrstuvwxyz",
    uppercases: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%&*+-_"
};
const GenerateButton = document.querySelector("#generateButton");
const renderDiv = document.querySelector("#renderDiv");
function passwordGenerator() {
    let finalCollection = charGroups.uppercases + charGroups.lowercases + charGroups.numbers + charGroups.symbols;

    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomChar = finalCollection[Math.floor(Math.random() * finalCollection.length)];
        password += randomChar;
    }
    return password;
}

GenerateButton.addEventListener("click", () => {
    let passwordGenerated = passwordGenerator()
    renderDiv.textContent = passwordGenerated;
})