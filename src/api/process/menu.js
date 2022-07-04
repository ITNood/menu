import api from '../'

export function list(data){
    return api.get("/api/menu/finAllMenu",data)
}
