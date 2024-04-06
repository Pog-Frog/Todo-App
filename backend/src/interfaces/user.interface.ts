import {Category} from "@prisma/client";
import {Task} from "@prisma/client";

;

export interface User {
    id?: string;
    email: string;
    password?: string;
    name: string;
    categories?: Category[];
    tasks?: Task[];

    toJSON?(): any;
}
