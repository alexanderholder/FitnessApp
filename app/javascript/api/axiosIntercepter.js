import { Axios } from "axios"

const addInterceptor = (axios) => axios.interceptors.request.use(
  (config) => {
    const tokenTag = document.getElementsByName("csrf-token")[0]
    const token = tokenTag ? tokenTag.getAttribute("content") : null

    if (token) {
      config.headers = config.headers || {}
      config.headers["X-CSRF-Token"] = token
    }

    return config
  },
  Promise.reject
)

export default addInterceptor
