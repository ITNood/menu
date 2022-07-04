import api from '../'

export function list(data){
    return api.get("/server/workflow/definition/save",data)
}
