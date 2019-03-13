// 1.缓存的名字
workbox.core.setCacheNameDetails({ prefix: "pwa-vue-project" });
// 2.缓存列表
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
// 3.把文件列表缓存起来
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


// 新增缓存策略 自己增加策略即可
workbox.routing.registerRoute(
    // 
    function (obj) {
        // 4.函数返回true则使用下面的workbox.strategies.staleWhileRevalidate()进行缓存
        // 包涵api的就缓存下来
        return obj.url.href.includes('/user')
    },  // 5.接下来看下app.vue, 看完就没了。一笔带过，接着是骨架屏 看skeleton.vue  然后看vue.config.js中的skeleton配置


    // 如果有多个缓存策略的话，可以使用多个workbox.strategies.func()
    workbox.strategies.staleWhileRevalidate() // 使用这个缓存策略
);

// workbox专门做缓存的库


// 首屏渲染 loading效果 －> 骨架屏
// vue有现成的插件

