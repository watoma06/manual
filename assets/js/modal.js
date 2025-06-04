document.addEventListener("DOMContentLoaded", function () {
  const openModalTriggers = document.querySelectorAll(".openModal");
  const closeButtons = document.querySelectorAll(".close");

  openModalTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
          const targetId = trigger.getAttribute("data-target");
          const targetModal = document.getElementById(targetId);

          // モーダルを表示
          targetModal.style.display = "block";
          targetModal.classList.add("fade-in");
      });
  });

  closeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
          const modal = btn.closest(".modal");
          modal.style.display = "none";
          modal.classList.remove("fade-in");
      });
  });

  window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
          e.target.style.display = "none";
          e.target.classList.remove("fade-in");
      }
  });
});
