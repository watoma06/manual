document.addEventListener("DOMContentLoaded", function () {
    const openModalTriggers = document.querySelectorAll(".openModal");
    const closeButtons = document.querySelectorAll(".close");
    const modals = document.querySelectorAll(".modal");

    // 初期状態でARIA属性を設定
    modals.forEach(modal => {
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-hidden", "true");
    });

    const closeModal = (modal) => {
        modal.style.display = "none";
        modal.classList.remove("fade-in");
        modal.setAttribute("aria-hidden", "true");
    };

    openModalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const targetId = trigger.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);

            // モーダルを表示
            targetModal.style.display = "block";
            targetModal.classList.add("fade-in");
            targetModal.setAttribute("aria-hidden", "false");
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            closeModal(modal);
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            closeModal(e.target);
        }
    });

    // Escキーでモーダルを閉じる
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
            modals.forEach(modal => {
                if (getComputedStyle(modal).display === "block") {
                    closeModal(modal);
                }
            });
        }
    });
});
