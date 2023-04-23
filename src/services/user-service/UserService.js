import axios from "axios"
const windowEnvConfig = window['runConfig']

const PREFIX_URL = `${windowEnvConfig.REACT_APP_BASE_API_URL}/expose`

const UserServices = {
    update: (data) => {
        const url = `${PREFIX_URL}/nfc/update`
        return axios.post(url, data)
    },
    getUser: () => {
        const url = `${PREFIX_URL}/nfc/get-user`
        return axios.get(url)

    },
}

export default UserServices