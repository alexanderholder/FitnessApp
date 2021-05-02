// @flow
import axios, {
  AxiosPromise,
  $AxiosXHR,
} from "axios"
import addInterceptor from "./axiosIntercepter"

addInterceptor(axios)

const del = axios.delete
const get = axios.get
const post = axios.post
const put = axios.put

export const Result = AxiosPromise
export const Response = $AxiosXHR

export {
  del,
  get,
  post,
  put,
}

export default axios
