let SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

class MyPlugin {
    apply(compiler) { // compiler 代表的是当前整个webpack大包的对象
        compiler.plugin('compilation', (compilation) => { // compilation当前这次大包的时候产生
            compilation.plugin(
                'html-webpack-plugin-before-html-processing',
                (data) => {
                    data.html = data.html.replace(`<div id="app"></div>`, `
                        <div id="app">
                            <div id="home" style="display:none">首页 骨架屏</div>
                            <div id="about" style="display:none">about页面骨架屏</div>
                        </div>
                        <script>
                            if(window.hash == '#/about' ||  location.pathname=='/about'){
                                document.getElementById('about').style.display="block"
                            }else{
                                document.getElementById('home').style.display="block"
                            }
                        </script>
                    `);
                    return data;
                }
            )
        });
    }
}


module.exports = {
    pwa: {
        name: 'My App',
        themeColor: '#f2f2f2',
        msTileColor: '#aaaaa',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // 默认是注入Manifest
        workboxPluginMode: 'InjectManifest',
        // 如果是注入Manifest的话就swSrc是必须要写的，vue把这个名字改成了'dev/service-worker.js',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'dev/service-worker.js',
        }
    },
    configureWebpack: {
        plugins: [
            new MyPlugin(),

            // 看骨架屏第一步：
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.resolve(__dirname, 'src/skeleton.js')
                    }
                },
                // 2.多个页面 去看看skeleton.js,其实就是简单的页面
                router: {
                    mode: 'history',
                    routes: [
                        {
                            path: '/',
                            skeletonId: 'skeletonA'
                        },
                        {
                            path: '/about',
                            skeletonId: 'skeletonB'
                        },
                    ]
                },
            }),
        ]
    } // webpack-merge
}