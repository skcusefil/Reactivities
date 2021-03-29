
import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity, ActivityFormValues } from '../models/activity';
import { PaginatedResult } from '../models/Pagination';
import { Photo, Profile, UserActivity } from '../models/profile';
import { User, UserFormValues } from '../models/User';
import { store } from '../stores/store';

//setting response delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//connect to .net api to use call data,create, update, delete
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config;
})

axios.interceptors.response.use(async response => {
    if(process.env.NODE_ENV === 'development') await sleep(1000);

    try {
        const pagination = response.headers['pagination'];
        if(pagination){
            response.data = new PaginatedResult(response.data, JSON.parse(pagination));
            return response as AxiosResponse<PaginatedResult<any>>
        }
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
}, (error: AxiosError) => {

    const { data, status, config } = error.response!;

    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }

            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            console.log(data)
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

//use Type T, ähnlich wie in C#
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: (params:URLSearchParams) => axios.get<PaginatedResult<Activity[]>>('/activities',{params}).then(responseBody),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => request.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
    attend: (id:string) => request.post<void>(`/activities/${id}/attend`,{})
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const Profiles = {
    get: (username:string) => request.get<Profile>(`/profiles/${username}`),
    uploadPhoto:(file: Blob)=>{
        let formData = new FormData();
        formData.append('File',file);
        return axios.post<Photo>('photos', formData,{
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    setMainPhoto: (id:string) => request.post(`/photos/${id}/setMain`, {}),
    deletePhoto:(id:string) => request.delete(`/photos/${id}`),
    updateProfile:(profile:Partial<Profile>) => request.put(`/profiles`,profile),
    updateFollowing:(username:string) => request.post(`/follow/${username}`,{}),
    listFollowing:(username:string, predicate:string)=>request.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities:(username:string, predicate:string) => request.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;
