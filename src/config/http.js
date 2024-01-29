import axios from 'axios';
import * as env from './env'
import * as NavigationService from '../utils/navigation';
import { Alert } from 'react-native'
import { store } from '../stores';
import { setUser } from '../stores/actions/userAction';

const axiosInstance = axios.create({
    baseURL: env.BASE_URL_DEVELOPMENT,
    timeout: 7000,
});

axiosInstance.interceptors.request.use(
    async config => {
        let apiToken = store.getState().service.data ?? '';
        // console.log('store', store.getState())
        // console.log('token', apiToken)
        config.headers = {
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json',
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);


axiosInstance.interceptors.response.use(undefined, async (err) => {
    if(err.response == undefined) {
        err = {
            status: 'failed',
            message: 'Gagal koneksi ke server',
            axiosMessage: err
        }
        
        return err
    } else {
        const {
            config,
            response: { status, data },
        } = err;
    
        if (status == 401) {
    
            return new Promise((resolve) => {
                Alert.alert('Silahkan Login Lagi', data.message, [{
                    text: 'OK',
                    onPress: () => {
                        store.dispatch(setUser({}))
                    },
                }])
            });
        }
    
        return data;
    }
});


export default axiosInstance;