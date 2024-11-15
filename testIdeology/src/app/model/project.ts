import { IRegisterUser } from "./registered-user";


export interface IProject {
    id: number;
    title: string;
    description: string;
    createDate: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    author: IRegisterUser;
    users: IRegisterUser[];
}
