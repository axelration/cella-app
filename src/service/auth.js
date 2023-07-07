import http from '../config/http'
import DeviceInfo from 'react-native-device-info'

const authService = {
    login(username, password) {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('username', username)
        formdata.append('password', password)
        formdata.append('device_id', deviceId)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/auth', formdata, config)
    }
}

export default authService;