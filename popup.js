document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: button.id }, (response) => {
                if (!response.success) {
                    alert(response.message || "Failed to perform action.");
                }
            });
        });
    });
});
