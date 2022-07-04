import api from '../'

export function save(data){
    return api.get("/server/workflow/definition/save",data)
}

// 查询流程定义列表
export function list(query) {
    return api.get("/workflow/definition/list",query)
}
