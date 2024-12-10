document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup script loaded...");

    const executeFunction = (func) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("No active tab found.");
                return;
            }
            const tabId = tabs[0].id;
            if (!tabId) {
                console.error("Invalid tabId.");
                return;
            }
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: func,
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error executing script:", chrome.runtime.lastError.message);
                }
            });
        });
    };


    document.getElementById("pip").addEventListener("click", () => {
        executeFunction(() => {
            const video = document.querySelector("video");
            if (video) {
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                } else {
                    video.requestPictureInPicture();
                }
            }
        });
    });

    document.getElementById("playPause").addEventListener("click", () => {
        executeFunction(() => {
            const video = document.querySelector("video");
            if (video) {
                video.paused ? video.play() : video.pause();
            }
        });
    });

    document.getElementById("muteUnmute").addEventListener("click", () => {
        executeFunction(() => {
            const video = document.querySelector("video");
            if (video) {
                video.muted = !video.muted;
            }
        });
    });
    document.getElementById("prev").addEventListener("click", () => {
        executeFunction(() => {
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowUp', // Simulating up arrow key press
                keyCode: 38, // ArrowUp key code
                code: 'ArrowUp',
                which: 38
            });
            document.dispatchEvent(event); // Dispatch the event
        });
    });

    // Simulate Down Arrow Key (Next Short)
    document.getElementById("next").addEventListener("click", () => {
        executeFunction(() => {
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowDown', // Simulating down arrow key press
                keyCode: 40, // ArrowDown key code
                code: 'ArrowDown',
                which: 40
            });
            document.dispatchEvent(event); // Dispatch the event
        });
    });


});
