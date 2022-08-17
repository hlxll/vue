// 项目的根目录添加该文件作为vue-cli的配置，或者在package中使用vue字段，但是需要遵守JSON格式写
module.exports = {
    //build的目录
    outputDir: "dist",
    //静态文件存放目录,相对于outputDir
    assetsDir: "public",
    //指定生成的 index.html 的输出路径 相对于outputDir
    indexPath: "index",


    //当使用非原生HTML标签的时候，vue会将他解析为一个注册的vue组件，如果失败，会将他渲染为自定义
    // 元素，但是也会告警：配置解决
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(option => ({
                ...option,
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('ico-')
                }
            }))
    },
    devServer: {
        proxy: {
            "/api": {
                "target": 'http://127.0.0.1:4000',
                "secure": false,
                "changeOrigin": true,
                "pathRewrite": {
                    '^/api': ""
                }
            }
        }
    }
}