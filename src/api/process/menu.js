import api from '../'

export function list(data) {
    return api.get("/server/menu/finAllMenu", data)
}

export function getMenu(parentId) {
    return api.get("/server/menu/getMenu", {id: parentId})
}


export function insertMenu(data) {
    return api.post("/server/menu/insertMenu", data)
}

export function updateMenu(data) {
    return api.put("/server/menu/updateMenu", data)
}

export function deleteMenu(data) {
    return api.delete("/server/menu/deleteMenu/" + data)
}
