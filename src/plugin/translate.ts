

// export default {
//     install: (app: any, params: any) => {
//         app.config.globalProperties.$translate = (key: string) => {
//             return '翻译文字'
//         }
//     }
// }
export default (app: any, params: any) => {
    app.config.globalProperties.$translate = () => {
        return '翻译文字'
    }
}