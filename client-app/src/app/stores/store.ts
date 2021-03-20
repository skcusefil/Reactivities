import { createContext, useContext } from "react";
import activityStore from "./activityStore";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modelStore";
import UserStore from "./userStore";

interface Store{
    activityStore: activityStore;
    commonStore:CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);


export function useStore(){
    return useContext(StoreContext);
}