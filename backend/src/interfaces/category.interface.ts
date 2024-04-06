import {Task} from "./task.interface";


export interface Category {
    id?: string;
    name: string;
    userId: string;
    icon: string;
    color: string;
    isEditable: boolean;
    tasks?: Task[];
}