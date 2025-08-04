function openModal(index) {
  const modal = document.getElementById(`modal-${index}`);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(index) {
  const modal = document.getElementById(`modal-${index}`);
  if (modal) {
    modal.classList.remove("active");
  }
}

// Close modal if clicked outside modal-content
window.addEventListener("click", function (e) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal, index) => {
    if (e.target === modal) {
      closeModal(index);
    }
  });
});
