import http from '../config/http'
import DeviceInfo from 'react-native-device-info'

const profileService = {
    changePassword(usr_id, password, passwordNew, passwordNewConfirmation) {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('usr_id', usr_id)
        formdata.append('old_password', password)
        formdata.append('password', passwordNew)
        formdata.append('confirm_password', passwordNewConfirmation)
        formdata.append('device_id', deviceId)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/user/changePwd', formdata, config)
    }
}

export default profileService;