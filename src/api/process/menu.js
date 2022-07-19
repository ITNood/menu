import api from '../'

export function list(data) {
    return api.get("/api/menu/finAllMenu", data)
}

export function getMenu(parentId) {
    return api.get("/api/menu/getMenu", {id: parentId})
}


export function insertMenu(data) {
    return api.post("/api/menu/insertMenu", data)
}

export function updateMenu(data) {
    return api.put("/api/menu/updateMenu", data)
}

export function deleteMenu(data) {
    return api.delete("/api/menu/deleteMenu/" + data)
}
