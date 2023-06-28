import axios from 'axios';
import * as env from './env'
import * as NavigationService from '../utils/navigation';
import { Alert } from 'react-native'
import { store } from '../stores';

const axiosInstance = axios.create({
    baseURL: env.BASE_URL_DEVELOPMENT,
    timeout: 7000,
});

axiosInstance.interceptors.request.use(
    async config => {
        let apiToken = store.getState().service.token
        console.log('token', apiToken)
        let tokenx = '';
        config.headers = {
            'Authorization': `Bearer ${tokenx}`,
            'Accept': 'application/json',
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);


axiosInstance.interceptors.response.use(undefined, async (err) => {
    const {
        config,
        response: { status, data },
    } = err;

    if (status === 401) {

        return new Promise((resolve) => {
            Alert.alert('Silahkan Login Lagi', data.message, [{
                text: 'OK',
                onPress: () => NavigationService.navigate('LogIn'),
            }])
        });
    }

    return data;
    // return Promise.reject(err);
});

/*
axios.interceptors.response.use(
    (response) => {
        alert(response)
        // return response
    },
    (error) => {
        alert(error)
        if (error && error.response == undefined) {
            alert('undefined')
            return Promise.reject(
                NavigationService.navigate("Main")
            );
        } else if (error && error.response && error.response.status === 401) {
            alert('401')
            return Promise.reject(
                NavigationService.navigate("LogIn")
            );
        }
    }
)
*/

export default axiosInstance;