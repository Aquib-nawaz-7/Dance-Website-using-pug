const enrollModal = document.getElementById("enroll-modal");
const galleryModal = document.getElementById("gallery-modal");
const galleryContainer = document.querySelector(".gallery-images");

const dances = [
  {
    gallery: ["/static/hip-hop dance.jpg", "/static/hip-hop dance.jpg", "/static/hip-hop dance.jpg"]
  },
  {
    gallery: ["/static/ballet dance.jpg", "/static/ballet dance.jpg", "/static/ballet dance.jpg"]
  },
  {
    gallery: ["/static/contemporary dance.jpg", "/static/contemporary dance.jpg", "/static/contemporary dance.jpg"]
  },
  {
    gallery: ["/static/salsa dance.jpg", "/static/salsa dance.jpg", "/static/salsa dance.jpg"]
  }
];

function openEnrollForm() {
  enrollModal.classList.add("active");
}
function closeEnrollForm() {
  enrollModal.classList.remove("active");
}

function showFees(index) {
  document.getElementById(`modal-fees-${index}`).classList.add("active");
}

function closeModal(id) {
  document.getElementById(`modal-${id}`).classList.remove("active");
}

function showGallery(index) {
  galleryContainer.innerHTML = "";
  const images = dances[index].gallery;
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Dance Gallery";
    img.style.width = "100%";
    img.style.marginBottom = "10px";
    galleryContainer.appendChild(img);
  });
  galleryModal.classList.add("active");
}
function closeGallery() {
  galleryModal.classList.remove("active");
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("dance-modal")) {
    e.target.classList.remove("active");
  }
});
