import http from '../config/http'
import DeviceInfo from 'react-native-device-info'

const attendanceService = {
    getAttendance(usr_id, type = '') {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('usr_id', usr_id)
        formdata.append('type', type)
        formdata.append('device_id', deviceId)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/getAttendance', formdata, config)
    },
    getAttendanceStat(usr_id) {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('usr_id', usr_id)
        formdata.append('device_id', deviceId)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/getAttendanceStat', formdata, config)
    },
    getGroupData(usr_id) {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('usr_id', usr_id)
        formdata.append('device_id', deviceId)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/getGroupData', formdata, config)
    },
    setAttendance(param) {
        const deviceId = DeviceInfo.getUniqueId()

        const formdata = new FormData()
        formdata.append('device_id', deviceId)
        formdata.append('usr_id', param.usr_id)
        formdata.append('type', param.type)
        formdata.append('check_time', param.check_time)
        formdata.append('latitude', param.latitude)
        formdata.append('longitude', param.longitude)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return http.post('api/setAttendance', formdata, config)
    }
}

export default attendanceService;