const registerModal = document.getElementById("register-modal");
const openBtn = document.getElementById("open-register-btn");
const closeBtn = document.getElementById("close-register-btn");
const registrationForm = document.getElementById("registration-form");

openBtn.addEventListener("click", () => {
  registerModal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  registerModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
  }
});

// Close modal on form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission
  // Here you can add your form submission logic (e.g., AJAX request)
  
  // Close the modal after submission
  registerModal.classList.remove("active");
});
