import api from '../'

export function save(data) {
  return api.post("/server/workflow/definition/save", data)
}

// 查询流程定义列表
export function list(query) {
  return api.get("/server/workflow/definition/list", query)
}

// 提交Json流程信息进行验证
export function sendJson(data) {
  return api.post('/server/workflow/definition/sendJson',data)
}
