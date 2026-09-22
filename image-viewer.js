document.addEventListener("DOMContentLoaded", () => {
    const viewer = document.createElement("div");
    viewer.className = "image-viewer";
    viewer.setAttribute("aria-hidden", "true");
    viewer.innerHTML = `
        <button class="image-viewer-close" type="button" aria-label="Close larger image">X</button>
        <img class="image-viewer-image" alt="">
    `;
    document.body.appendChild(viewer);

    const viewerImage = viewer.querySelector(".image-viewer-image");
    const closeButton = viewer.querySelector(".image-viewer-close");

    const closeViewer = () => {
        viewer.classList.remove("is-open");
        viewer.setAttribute("aria-hidden", "true");
    };

    document.querySelectorAll(".project-detail img").forEach((image) => {
        if (image.closest("a")) {
            return;
        }

        const link = document.createElement("a");
        link.href = image.currentSrc || image.src;
        link.className = "image-link";
        link.setAttribute("aria-label", `Open larger view of ${image.alt || "project image"}`);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            viewerImage.src = image.currentSrc || image.src;
            viewerImage.alt = image.alt || "Larger project image";
            viewer.classList.add("is-open");
            viewer.setAttribute("aria-hidden", "false");
            closeButton.focus();
        });

        image.parentNode.insertBefore(link, image);
        link.appendChild(image);
    });

    closeButton.addEventListener("click", closeViewer);
    viewer.addEventListener("click", (event) => {
        if (event.target === viewer) {
            closeViewer();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeViewer();
        }
    });
});
