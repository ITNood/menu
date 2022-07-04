import api from './'

// 获取验证码
export function getCodeImg() {
    return api.get("/server/captchaImage")
}


// 获取验证码
export function login(data) {
    return api.post("/server/login",data)
}

