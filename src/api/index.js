import http from '../Http'

class api {
  async post(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.post(url, params)
  }
  async get(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.get(url, { params })
  }
  async put(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.put(url, params)
  }
  async delete(url, params) {
    //请求。页面中.then执行成功时的操作。
    return await http.delete(url, params)
  }

}
export default new api()
