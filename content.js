document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.querySelector('video');

    // Toggle PiP Mode
    const togglePiP = async () => {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else if (videoElement) {
            await videoElement.requestPictureInPicture();
        }
    };

    // Add playback control logic
    const playPause = () => (videoElement.paused ? videoElement.play() : videoElement.pause());
    const muteUnmute = () => (videoElement.muted = !videoElement.muted);

    const nextShort = () => document.querySelector('.ytp-next-button')?.click();
    const prevShort = () => document.querySelector('.ytp-prev-button')?.click();

    // Export these functions for use
    window.togglePiP = togglePiP;
    window.playPause = playPause;
    window.muteUnmute = muteUnmute;
    window.nextShort = nextShort;
    window.prevShort = prevShort;
});
