import { User } from "./appointment";

export interface Task 
{
    id: string;
    user : User;
    taskTemplate : TaskTemplate;
    execution : Executions;
}

interface TaskTemplate {
    id: string;
    name : string;
    description :string;
    order : number;

}


interface Executions {
    id: string;
    status : string;
    endTime :string;
    agent : Agent;
}

interface Agent {
    id: string;
    name : string;
    description :string;
    order : number;
}