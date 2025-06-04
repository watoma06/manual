document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            const item = this.parentElement;
            const content = item.querySelector(".accordion-content");
            const icon = this.querySelector(".toggle-icon");

            if (item.classList.contains("active")) {
                // 閉じるときに上に戻るアニメーションを適用
                content.classList.add("closing");
                setTimeout(() => {
                    item.classList.remove("active");
                    content.classList.remove("closing");
                    icon.textContent = "＋";
                }, 300); // アニメーション時間に合わせて調整
            } else {
                // 開くときは通常のアニメーション（下に伸びる）
                item.classList.add("active");
                icon.textContent = "－";
            }
        });
    });
});