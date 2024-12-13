// Wait for the PiP window to be available
function addControlsToPiP() {
    const pipWindow = document.querySelector('video');

    // Only proceed if PiP window is found
    if (pipWindow && document.pictureInPictureElement) {
        // Check if the control buttons are already created to avoid duplication
        if (document.getElementById("pip-controls")) return;

        // Create a container for buttons
        const controlsContainer = document.createElement("div");
        controlsContainer.id = "pip-controls";
        controlsContainer.style.position = "absolute";
        controlsContainer.style.top = "10px";  // Position it at the top of the PiP window
        controlsContainer.style.left = "50%";
        controlsContainer.style.transform = "translateX(-50%)";
        controlsContainer.style.zIndex = "9999";
        controlsContainer.style.display = "flex";
        controlsContainer.style.justifyContent = "center";
        controlsContainer.style.width = "100%";

        // Create the buttons
        const buttons = [
            { id: "playPause", text: "Play/Pause" },
            { id: "muteUnmute", text: "Mute/Unmute" },
            { id: "prev", text: "Prev" },
            { id: "next", text: "Next" },
        ];

        buttons.forEach(button => {
            const btn = document.createElement("button");
            btn.id = button.id;
            btn.textContent = button.text;
            btn.style.margin = "0 5px";
            controlsContainer.appendChild(btn);
        });

        // Append the controls to the document body
        document.body.appendChild(controlsContainer);

        // Add event listeners for each button
        document.getElementById("playPause").addEventListener("click", () => {
            const video = document.querySelector("video");
            if (video) {
                video.paused ? video.play() : video.pause();
            }
        });

        document.getElementById("muteUnmute").addEventListener("click", () => {
            const video = document.querySelector("video");
            if (video) {
                video.muted = !video.muted;
            }
        });

        document.getElementById("prev").addEventListener("click", () => {
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowUp',
                keyCode: 38,
                code: 'ArrowUp',
                which: 38
            });
            document.dispatchEvent(event);
        });

        document.getElementById("next").addEventListener("click", () => {
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowDown',
                keyCode: 40,
                code: 'ArrowDown',
                which: 40
            });
            document.dispatchEvent(event);
        });
    }
}

// Monitor for PiP status changes
function monitorPiP() {
    document.addEventListener('enterpictureinpicture', addControlsToPiP);
    document.addEventListener('leavepictureinpicture', () => {
        const controls = document.getElementById("pip-controls");
        if (controls) {
            controls.remove();
        }
    });
}

// Run when the page is loaded
monitorPiP();
