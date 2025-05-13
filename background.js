chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "showAlert") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Deal Found!",
            message: request.message
        });
    }
});
