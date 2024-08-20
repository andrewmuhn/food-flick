import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';
const environment = import.meta.env.VITE_ENVIRONMENT;

const baseURL = environment === 'development'
    ? 'http://localhost:8080/api'
    : 'http://food-flick-env.eba-cmk3wbx6.us-east-2.elasticbeanstalk.com/api';

const dinnerPartyApiInstance = axios.create({
    baseURL
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