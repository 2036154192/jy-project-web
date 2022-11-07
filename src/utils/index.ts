// 获取assets静态资源
export const getAssetsFile = (url: string) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href;
};

// 平面一维通过id和pid转换成树形结构
export function toTree(data:any) {
    let result:any = []
    if (!Array.isArray(data)) {
        return result
    }
    data.forEach((item) => {
        delete item.children
    })
    let map = {}
    data.forEach((item) => {
        // @ts-ignore
        map[item.id] = item
    })
    data.forEach((item) => {
        // @ts-ignore
        let parent = map[item.pid]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

export default {
    getAssetsFile,
    toTree
};