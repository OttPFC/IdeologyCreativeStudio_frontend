import { IUser } from "./user";

export interface IClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
    enabled: boolean;
    createDate: Date;
    lastModifiedDate: Date;
    createBy:IUser
    selected?: boolean
 }

