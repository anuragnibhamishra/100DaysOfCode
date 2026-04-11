const container = document.querySelector("#stepsContainer");

const steps = [
  { title: "Basic Information", desc: "Name, Age, Gender, Etc." },
  { title: "Contact Details", desc: "Phone, Email, Address" },
  { title: "Education", desc: "School, College, Degree" },
  { title: "Documents Upload", desc: "ID Proof, Certificates" },
  { title: "Review", desc: "Check all entered details" },
  { title: "Submit", desc: "Final submission step" }
];

steps.forEach((step, index) => {
  const button = document.createElement("button");
  button.className = "w-full h-fit flex items-center p-2 hover:bg-neutral-800 cursor-pointer rounded-xl";

  const stepNumber = document.createElement("span");
  stepNumber.className = "w-8 h-8 rounded-lg inline-flex items-center justify-center bg-neutral-700";
  stepNumber.textContent = index + 1;


  const textWrapper = document.createElement("div");
  textWrapper.className = "ml-2";

  const title = document.createElement("p");
  title.className = "text-left text-sm";
  title.textContent = step.title;

  const desc = document.createElement("p");
  desc.className = "text-xs text-left text-neutral-400";
  desc.textContent = step.desc;

  textWrapper.appendChild(title);
  textWrapper.appendChild(desc);


  const iconWrapper = document.createElement("div");
  iconWrapper.className = "ml-auto";

  iconWrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.707 5.293l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1 -1.414 -1.414l5.293 -5.293l-5.293 -5.293a1 1 0 0 1 1.414 -1.414"/>
    </svg>
  `;
  button.appendChild(stepNumber);
  button.appendChild(textWrapper);
  button.appendChild(iconWrapper);

  container.appendChild(button);
});