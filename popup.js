document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup script loaded...");

    const executeFunction = (func) => {
        chrome.runtime.sendMessage({ action: func });
    };

    document.getElementById("pip").addEventListener("click", () => {
        executeFunction("pip");
    });

    document.getElementById("playPause").addEventListener("click", () => {
        executeFunction("playPause");
    });

    document.getElementById("muteUnmute").addEventListener("click", () => {
        executeFunction("muteUnmute");
    });

    document.getElementById("prev").addEventListener("click", () => {
        executeFunction("prev");
    });

    document.getElementById("next").addEventListener("click", () => {
        executeFunction("next");
    });
});
