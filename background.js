let youtubeShortsTabId = null;

// Monitor when the tab is updated or activated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && /https:\/\/www\.youtube\.com\/shorts\//.test(tab.url)) {
        youtubeShortsTabId = tabId;
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    // If the active tab is a YouTube Shorts page, store its tab ID
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && /https:\/\/www\.youtube\.com\/shorts\//.test(tab.url)) {
            youtubeShortsTabId = tab.id;
        }
    });
});

// Listen for actions from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (youtubeShortsTabId !== null) {
        executeActionOnShortsPage(request.action);
    }
});

// Execute action on the YouTube Shorts page
function executeActionOnShortsPage(action) {
    chrome.scripting.executeScript({
        target: { tabId: youtubeShortsTabId },
        func: controlYouTubeAction,
        args: [action]
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
            document.dispatchEvent(upArrowEvent); // Dispatch the event
            break;
        case "next":
            // Simulate Down Arrow Key (Next Short)
            const downArrowEvent = new KeyboardEvent('keydown', {
                key: 'ArrowDown',
                keyCode: 40,
                code: 'ArrowDown',
                which: 40
            });
            document.dispatchEvent(downArrowEvent); // Dispatch the event
            break;
        default:
            console.log("Unknown action:", action);
    }
}
