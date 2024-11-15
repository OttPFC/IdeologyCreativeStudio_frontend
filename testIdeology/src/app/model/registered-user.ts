export interface IRegisterUser {
    id : number;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password?:string;
    role:string
    enabled: boolean;
}
