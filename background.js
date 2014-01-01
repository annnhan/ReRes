var ReResMap = [];

function getLocalStorage() {
    ReResMap = window.localStorage.ReResMap ? JSON.parse(window.localStorage.ReResMap) : ReResMap;
}

function encodeText(text, type){
    if (type == 'js') {
        text = text.replace(/[\u0080-\uffff]/g, function($0) {
            var tmp = $0.charCodeAt(0).toString(16);
            return "\\u" + new Array(5 - tmp.length).join('0') + tmp;
        });
    }
    if (type != 'main_frame') {
        text = encodeURIComponent(text);
    }
    return text;
}

function getLocalFileUrl(url) {
    var typeMap = {
        "txt"   : "text/plain",
        "html"  : "text/html",
        "css"   : "text/css",
        "js"    : "text/javascript",
        "json"  : "text/json",
        "xml"   : "text/xml",
        "jpg"   : "image/jpeg",
        "gif"   : "image/gif",
        "png"   : "image/png",
        "webp"  : "image/webp"
    }
    var arr = url.split('.');
    var type = arr[arr.length-1];
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, false);
    xhr.send(null);
    var content = xhr.responseText || xhr.responseXML;
    if (!content) {
        return false;
    }
    var ret = "data:" + (typeMap[type] || typeMap.txt) + ";charset=utf-8," + encodeText(content, type);
    return ret;
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
        var url = details.url;
        for (var i = 0, len = ReResMap.length; i < len; i++) {
            var reg = new RegExp(ReResMap[i].req, 'g');
            if (ReResMap[i].checked && ReResMap[i].res && reg.test(url)) {
                if (!/^file:\/\//.test(ReResMap[i].res)) {
                    return ReResMap[i].type === 'file' ?
                    {redirectUrl: ReResMap[i].res} :
                    {redirectUrl: url.replace(reg, ReResMap[i].res)};
                } else {
                    return ReResMap[i].type === 'file' ?
                    {redirectUrl: getLocalFileUrl(ReResMap[i].res)} :
                    {redirectUrl: getLocalFileUrl(url.replace(reg, ReResMap[i].res))};
                }
            }
        }
        return true;
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

getLocalStorage();
window.addEventListener('storage', getLocalStorage, false);

