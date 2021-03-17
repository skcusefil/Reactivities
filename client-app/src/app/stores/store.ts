import { createContext, useContext } from "react";
import activityStore from "./activityStore";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store{
    activityStore: activityStore;
    commonStore:CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);


export function useStore(){
    return useContext(StoreContext);
}