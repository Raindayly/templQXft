import axios from "axios";
import {vm} from "@/main";
import {setStore} from "@/utils/localstoreage";

const requset = axios.create({
  baseURL: 'http://localhost:9090',
  timeout: 30000
})

requset.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  // let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
  let token = localStorage.getItem("token")
  if(token){
    config.headers['token'] = token
  }
  return config
}), error => {
  vm.$message.error(error)
  return Promise.reject(error)
}
requset.interceptors.response.use(response => {
  let res = response.data
  if (response.config.responseType === 'blob') {
    return res
  }
  if(res.code == "401"){
    setStore("isTokenTimeOut","true")
  }
  return res
}),error => {
  vm.$message.error(error)
  // return Promise.reject(error)
}

export default requset
