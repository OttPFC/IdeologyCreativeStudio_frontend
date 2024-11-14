import { IUser } from "./user";

export interface Project {
    id: number;
    title: string;
    description: string;
    createDate: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    author: IUser;
    users: IUser[];
}
