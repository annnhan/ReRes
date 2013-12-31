var ReResMap = [];

function getLocalStorage() {
    ReResMap = window.localStorage.ReResMap ? JSON.parse(window.localStorage.ReResMap) : ReResMap;
}

getLocalStorage();
window.addEventListener('storage', getLocalStorage, false);

chrome.webRequest.onBeforeRequest.addListener(function (details) {
        var url = details.url;
        for (var i = 0, len = ReResMap.length; i < len; i++) {
            var reg = new RegExp(ReResMap[i].req, 'g');
            if (ReResMap[i].checked && ReResMap[i].res && reg.test(url)) {
                return ReResMap[i].type === 'file' ? {redirectUrl: ReResMap[i].res} : {redirectUrl: url.replace(reg, ReResMap[i].res)};
            }
        }
        return true;
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

