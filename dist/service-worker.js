
// 1. 引入了workbox-sw.js和缓存列表
importScripts("/precache-manifest.aa0e1d76f4c4484b1effc11826c5e38d.js",
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 设置缓存的名字
workbox.core.setCacheNameDetails({ prefix: "pwa-vue-project" });
// 缓存列表
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// 缓存警告
workbox.precaching.suppressWarnings();
// 把文件列表缓存起来
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


// 新增缓存策略 自己增加策略即可
workbox.routing.registerRoute(
    function (obj) {  // 函数返回true则缓存
        // 包涵api的就缓存下来
        return obj.url.href.includes('/user')
    },
    workbox.strategies.staleWhileRevalidate() // 使用这个缓存策略
);

// workbox专门做缓存的库


// 首屏渲染 loading效果 －> 骨架屏
// vue有现成的插件


