var ReResMap = {
    "file":[],
    "dir":[]
};

function getLocalStorage() {
    ReResMap = window.localStorage.ReResMap ? JSON.parse(window.localStorage.ReResMap) : ReResMap;
}
getLocalStorage();
window.addEventListener('storage', getLocalStorage, false);

//chrome.webRequest.onBeforeRequest.addListener(function (details) {
//        var url = details.url,
//            file = ReResMap.file,
//            dir = ReResMap.dir,
//            i,
//            len,
//            reg;
//        for (i = 0, len = file.length; i < len; i++) {
//            reg = new RegExp(file[i].req, 'g');
//            if (file[i].res && reg.test(url)) {
//                return {redirectUrl: file[i].res};
//            }
//        }
//        for (i = 0, len = dir.length; i < len; i++) {
//            reg = new RegExp(file[i].req, 'g');
//            if (dir[i].res && reg.test(url)) {
//                return {redirectUrl: url.replace(reg, dir[i].res)};
//            }
//        }
//        return true;
//    },
//    {urls: ["<all_urls>"]},  //监听所有的url,也可以通过*来匹配。
//    ["blocking"]
//);

