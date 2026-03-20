const signupForm = document.querySelector("#signup");
const loginForm = document.querySelector("#login");
const formTitle = document.querySelector("#formTitle");
const errorDiv = document.querySelector("#error");
const loginErrorDiv = document.querySelector("#loginError");
const showLoginLink = document.querySelector("#showLoginLink");
const showSignupLink = document.querySelector("#showSignupLink");
const logoutBtn = document.querySelector("#logoutBtn");


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEYS = {
    users: "users",
    currentUser: "currentUser"
};


function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function toggleForms(showLogin) {
    if (showLogin) {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        formTitle.innerText = "Welcome Back";
    } else {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        formTitle.innerText = "Welcome";
    }
}

function validateEmail(email) {
    return EMAIL_REGEX.test(email);
}

function clearErrors() {
    errorDiv.innerText = "";
    loginErrorDiv.innerText = "";
}

function signup(e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    
    if (!name || !email || !password) {
        errorDiv.innerText = "Please fill in all fields!";
        return;
    }

    if (!validateEmail(email)) {
        errorDiv.innerText = "Please enter a valid email address!";
        return;
    }

    const users = getUsers();
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        errorDiv.innerText = "Email already registered!";
        return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    errorDiv.classList.remove("text-red-500");
    errorDiv.classList.add("text-green-500");
    errorDiv.innerText = "Signup successful!";
    
    setTimeout(() => {
        signupForm.reset();
        toggleForms(true);
    }, 1000);
}

function login(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    
    if (!email || !password) {
        loginErrorDiv.innerText = "Please fill in all fields!";
        return;
    }

    if (!validateEmail(email)) {
        loginErrorDiv.innerText = "Please enter a valid email address!";
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        loginErrorDiv.innerText = "Invalid credentials";
        return;
    }

    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    showDashboard(user);
}

function showDashboard(user) {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("flex");
    document.getElementById("welcome").innerText = `Welcome, ${user.name}`;
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    location.reload();
}

signupForm.addEventListener("submit", signup);
loginForm.addEventListener("submit", login);
showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(true);
});
showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(false);
});
logoutBtn.addEventListener("click", logout);


(function init() {
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser));
    if (currentUser) {
        showDashboard(currentUser);
    }
})();