const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const nameInput = document.getElementById("register-name");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

const users = JSON.parse(localStorage.getItem("users")) || [];

function toggleForms() {
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");

  if (!loginForm.classList.contains("hidden")) {
    loginEmail.focus();
  } else {
    nameInput.focus();
  }
}

function hashPassword(password) {
  return btoa(password);
}

// Validation functions
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const validatePassword = (password) => password.trim().length >= 8;

const validateName = (name) => name.trim().length >= 2;

const register = (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!validateName(name))
    return alert("Name must be at least 2 characters long.");
  if (!validateEmail(email))
    return alert("Please enter a valid email address.");
  if (!validatePassword(password))
    return alert("Password must be at least 8 characters long.");

  if (users.some((user) => user.email === email)) {
    alert("Email is already registered.");
    return;
  }

  users.push({ name, email }); // No password stored!
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please log in.");
  toggleForms();
  registerForm.reset();
};

const login = (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  if (!validateEmail(email))
    return alert("Please enter a valid email address.");
  if (!validatePassword(password)) return alert("Invalid password format.");

  const user = users.find((user) => user.email === email);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password.");
  }
};

registerForm.addEventListener("submit", register);
loginForm.addEventListener("submit", login);
