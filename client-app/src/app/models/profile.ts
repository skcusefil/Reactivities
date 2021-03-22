import { User } from "./User";

export interface Profile{
    username:string;
    displayName	: string;
    image?:string;
    bio?:string;
}

export class Profile implements Profile{
    constructor(user: User){
        this.username = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}