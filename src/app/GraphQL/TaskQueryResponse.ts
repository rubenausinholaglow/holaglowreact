import { PageInfo } from "./PageInfo";

export interface TaskQueryResponse
{
    taskInstances : TaskInstancesResponse
}

export interface TaskInstancesResponse
{
    edges : TaskResponseEdge[];
    pageInfo : PageInfo;
    totalCount : number;
}

export interface TaskResponseEdge{
   node : TaskResponseNode;
}
export interface TaskResponseNode{
    id: string;
    creationDate : Date;
    completedTime : Date;
    durationtime : string;
    user : UserTask;
    taskTemplate : TaskTemplate;
    execution : Executions;
}

interface UserTask
{
    firstName : string;
    lastName : string;
    secondLastName : string
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
    agent : Agent[];
}

interface Agent {
    id: string;
    name : string;
    description :string;
    order : number;
}