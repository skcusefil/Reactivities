import { createContext, useContext } from "react";
import activityStore from "./activityStore";
import ActivityStore from "./activityStore";

interface Store{
    activityStore: activityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);


export function useStore(){
    return useContext(StoreContext);
}