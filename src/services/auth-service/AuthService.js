import axios from "axios"
import queryString from "query-string"

const windowEnvConfig = window['runConfig']


const PREFIX_URL = `${windowEnvConfig.REACT_APP_BASE_API_URL}/auth`
const AuthServices = {

    checkUser: (data) => {
        const url = `${PREFIX_URL}/check-user`
        return axios.post(url, data)
    },
    register: (data) => {
        const url = `${PREFIX_URL}/register`
        return axios.post(url, data)
    },
    login: (data) => {
        const url = `${PREFIX_URL}/login`
        return axios.post(url, data)
    },
   
    getUserByNickName: (params) => {
        const url = `${PREFIX_URL}/get-user`
        return axios.get(url, {
            params,
            paramsSerializer: {
                serialize: (params) => queryString.stringify(params, { arrayFormat: 'brackets' })
            }
        })
    }
}

export default AuthServices