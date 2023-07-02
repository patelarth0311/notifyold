import { Dispatch, SetStateAction, createContext } from "react";
import { AppStatus } from "../types/types";
export const MyContext = createContext<{ appStatus: AppStatus, setAppStatus: (e: AppStatus) => void }>({
    appStatus: { response: "", status: "", userId: null },
    setAppStatus: (e: AppStatus) => { }
});