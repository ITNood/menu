import api from '../'

export function list(data){
    return api.get("/menu/finAllMenu",data)
}
