import { IRegisterUser } from "./registered-user";

export interface IProject {
  
  id: number;
  title: string;
  description: string;
  createDate: string;  
  startDate: string;   
  endDate: string;     
  status: string;
  author: IRegisterUser;
  users: IRegisterUser[];
}
