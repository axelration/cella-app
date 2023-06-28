import http from '../config/http'

const authService = {
    login(username, password, deviceId) {
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