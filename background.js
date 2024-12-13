let youtubeShortsTabId = null;

// Function to find and set an active YouTube Shorts tab
function findActiveShortsTab(callback) {
    chrome.tabs.query({ url: "*://www.youtube.com/shorts/*" }, (tabs) => {
        if (tabs.length > 0) {
            youtubeShortsTabId = tabs[0].id;
            callback(youtubeShortsTabId);
        } else {
            youtubeShortsTabId = null;
            callback(null);
        }
    });
}

// Listen for actions from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    findActiveShortsTab((tabId) => {
        if (tabId) {
            executeActionOnShortsPage(request.action, tabId);
            sendResponse({ success: true });
        } else {
            sendResponse({ success: false, message: "No active YouTube Shorts tab found." });
        }
    });
    return true; // Indicates asynchronous response
});

// Execute action on the Shorts page
function executeActionOnShortsPage(action, tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: controlYouTubeAction,
        args: [action]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Failed to execute action:", chrome.runtime.lastError.message);
        }
    });
}

// Function to perform action on the Shorts page
function controlYouTubeAction(action) {
    const video = document.querySelector("video");
    if (!video) {
        console.error("No video element found on the page");
        return;
    }

    switch (action) {
        case "pip":
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                video.requestPictureInPicture();
            }
            break;
        case "playPause":
            video.paused ? video.play() : video.pause();
            break;
        case "muteUnmute":
            video.muted = !video.muted;
            break;
        case "prev":
            // Simulate Up Arrow Key (Previous Short)
            const upArrowEvent = new KeyboardEvent('keydown', {
                key: 'ArrowUp',
                keyCode: 38,
                code: 'ArrowUp',
                which: 38
            });
            document.dispatchEvent(upArrowEvent);
            break;
        case "next":
            // Simulate Down Arrow Key (Next Short)
            const downArrowEvent = new KeyboardEvent('keydown', {
                key: 'ArrowDown',
                keyCode: 40,
                code: 'ArrowDown',
                which: 40
            });
            document.dispatchEvent(downArrowEvent);
            break;
        default:
            console.log("Unknown action:", action);
    }
}
