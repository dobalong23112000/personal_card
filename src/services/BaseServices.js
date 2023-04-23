
import axios from 'axios'
import queryString from 'query-string'
import { LoadingComponent } from "../components/LoadingComponent.tsx"
import {  toast } from 'react-toastify';

const windowEnvConfig = window['runConfig']

// const local = localStorage.getItem("locale") || 'vi'
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const BaseServices = axios.create({
    baseURL: windowEnvConfig.REACT_APP_BASE_API_URL,
    timeout: 40000,
    headers: {
        'content-type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language" : 'vi'
    },
    paramsSerializer: {
        serialize:  (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
      }
    
})

BaseServices.interceptors.request.use(async (config) => {

    const token = ""
    LoadingComponent.runLoadingBlockUI()

    // config.headers.lang = local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // LoadingComponent.stopRunLoading()

    return config
})

BaseServices.interceptors.response.use((response) => {

    LoadingComponent.runLoadingBlockUI()
    if (response && response.data) {
        LoadingComponent.stopRunLoading()
        return response.data
    }
    LoadingComponent.stopRunLoading()

    return response
}, (error) => {
    // Handle errors
    LoadingComponent.stopRunLoading()
    // const dispatch = useDispatch()
    const response = error.response
    if (response && response.status === 401) {
        if (response?.data?.status === 401) {
            toast.error('Sai email hoặc mật khẩu', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        } else {
            // keycloak.logout()
        }
        return
    }
    // Swal.fire({
    //     title: "Error",
    //     text: error.message,
    //     icon: "error",
    //     dangerMode: false
    // })

    throw error
})

export default BaseServices
