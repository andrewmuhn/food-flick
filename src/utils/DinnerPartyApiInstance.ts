import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';

const dinnerPartyApiInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

dinnerPartyApiInstance.interceptors.request.use(async (config) => {
    try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else{
            console.warn('No Token!');
        }
    } catch (error) {
        console.error('Error fetching token', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default dinnerPartyApiInstance;