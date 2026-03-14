const denominations = [
    { value: 500, id: 'FiveHs', label: 'No. of 500s' },
    { value: 200, id: 'TwoHs', label: 'No. of 200s' },
    { value: 100, id: 'Hundreds', label: 'No. of 100s' },
    { value: 50, id: 'Fiftys', label: 'No. of 50s' },
    { value: 20, id: 'Twentys', label: 'No. of 20s' },
    { value: 10, id: 'Tens', label: 'No. of 10s' },
    { value: 5, id: 'Fives', label: 'No. of 5s' },
    { value: 2, id: 'Twos', label: 'No. of 2s' },
    { value: 1, id: 'Ones', label: 'No. of 1s' }
];

const container = document.querySelector("#notesContainer");
const elements = {};

denominations.forEach(denom => {
    const div = document.createElement('div');
    div.className = "w-fit text-xs h-fit flex flex-col justify-between text-left gap-2";
    
    const spanLabel = document.createElement('span');
    spanLabel.className = "ml-1";
    spanLabel.textContent = denom.label;
    
    const spanValue = document.createElement('span');
    spanValue.id = denom.id;
    spanValue.className = "bg-neutral-900 text-lg px-10 py-2.5 rounded-xl";
    spanValue.textContent = "0";
    
    div.appendChild(spanLabel);
    div.appendChild(spanValue);
    container.appendChild(div);
    
    elements[denom.id] = spanValue;
});

const INRInput = document.querySelector("#INRInput");
const ErrorDiv = document.querySelector("#error");

INRInput.addEventListener("input", (e) => {
    let cleaned = e.target.value.replace(/[^0-9]/g, "")
    if (cleaned !== e.target.value) {
        e.target.value = cleaned;
    }
    const outputs = Object.values(elements);

    outputs.forEach(el => {
        el.textContent = 0;
        el.classList.remove("text-purple-400");
    });

    ErrorDiv.textContent = "";

    if (e.target.value === "") return;

    let amount = Number(INRInput.value);

    if (isNaN(amount)) {
        ErrorDiv.textContent = "Please enter a valid number";
    } else if (amount <= 0) {
        ErrorDiv.textContent = "Please enter a positive number";
    } else {
        let amountCalc = amount;
        denominations.forEach(denom => {
            if (amountCalc >= denom.value) {
                const count = Math.floor(amountCalc / denom.value);
                elements[denom.id].textContent = count;
                elements[denom.id].classList.add("text-purple-400");
                amountCalc = amountCalc % denom.value;
            }
        });
    }
});