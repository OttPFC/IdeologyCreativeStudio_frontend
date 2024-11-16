import { IRole } from "./role";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roles:IRole[],
    enabled: boolean;
    createDate: Date;

}
