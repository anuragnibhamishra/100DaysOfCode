const INRInput = document.querySelector("#INRInput");
const submitButton = document.querySelector("#submit");
const FiveHs = document.querySelector("#FiveHs")
const TwoHs = document.querySelector("#TwoHs")
const Hundreds = document.querySelector("#Hundreds")
const Fiftys = document.querySelector("#Fiftys")
const Twentys = document.querySelector("#Twentys")
const Tens = document.querySelector("#Tens")
const Fives = document.querySelector("#Fives")
const Twos = document.querySelector("#Twos")
const Ones = document.querySelector("#Ones")
const error = document.querySelector("#error")

INRInput.addEventListener("input", (e) => {
    error.textContent = ""
    if (e.target.value === "") {
        const outputs = [FiveHs, TwoHs, Hundreds, Fiftys, Twentys, Tens, Fives, Twos, Ones]
        outputs.forEach(el => {
            el.textContent = 0
            el.classList.remove("text-purple-400")
        })
        return
    }
    let amount = Number(INRInput.value);
    if (isNaN(amount)) {
        error.textContent = "Please enter a valid number";
    } else if (amount <= 0) {
        error.textContent = "Please enter a positive number";
    } else {
        
        let amountCalc = amount;
        if (amountCalc >= 500) {
            FiveHs.textContent = Math.floor(amountCalc / 500)
            FiveHs.classList.add("text-purple-400")
            amountCalc = amountCalc % 500;
        }
        if (amountCalc >= 200) {
            TwoHs.textContent = Math.floor(amountCalc / 200)
            TwoHs.classList.add("text-purple-400")
            amountCalc = amountCalc % 200
        }
        if (amountCalc >= 100) {
            Hundreds.textContent = Math.floor(amountCalc / 100)
            Hundreds.classList.add("text-purple-400")
            amountCalc = amountCalc % 100
        }
        if (amountCalc >= 50) {
            Fiftys.textContent = Math.floor(amountCalc / 50)
            Fiftys.classList.add("text-purple-400")
            amountCalc = amountCalc % 50
        }
        if (amountCalc >= 20) {
            Twentys.textContent = Math.floor(amountCalc / 20)
            Twentys.classList.add("text-purple-400")
            amountCalc = amountCalc % 20
        }
        if (amountCalc >= 10) {
            Tens.textContent = Math.floor(amountCalc / 10)
            Tens.classList.add("text-purple-400")
            amountCalc = amountCalc % 10
        }
        if (amountCalc >= 5) {
            Fives.textContent = Math.floor(amountCalc / 5)
            Fives.classList.add("text-purple-400")
            amountCalc = amountCalc % 5
        }
        if (amountCalc >= 2) {
            Twos.textContent = Math.floor(amountCalc / 2)
            Twos.classList.add("text-purple-400")
            amountCalc = amountCalc % 2
        }
        if (amountCalc >= 1) {
            Ones.textContent = amountCalc
            Ones.classList.add("text-purple-400")
        }
    }
})