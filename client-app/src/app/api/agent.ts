
 import axios, {AxiosResponse} from 'axios';
import { resolve } from 'node:path';
import { Activity } from '../models/activity';
//import { TableBody } from 'semantic-ui-react';

//setting response delay
const sleep = (delay:number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

//connect to .net api to use call data,create, update, delete
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

//use Type T, ähnlich wie in C#
const responseBody =<T> (response: AxiosResponse) =>response.data;

const request ={
    get:<T> (url:string) => axios.get(url).then(responseBody),
    post: <T> (url:string, body:{}) => axios.post(url,body).then(responseBody),
    put: <T>  (url:string, body:{}) => axios.put(url,body).then(responseBody),
    delete:<T>  (url:string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details:(id: string) =>request.get<Activity>(`/activities/${id}`),
    create:(activity:Activity) =>request.post<void>('/activities', activity),
    update:(activity:Activity) =>request.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string) => request.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;

function activity<T>(arg0: string, activity: any) {
    throw new Error('Function not implemented.');
}
