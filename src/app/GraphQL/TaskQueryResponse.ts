import { PageInfo } from "./PageInfo";

export interface TaskQueryResponse
{
    taskInstances : TaskInstancesResponse
}

interface TaskInstancesResponse
{
    edges : TaskResponseEdge[];
    pageInfo : PageInfo;
    totalCount : number;
}

interface TaskResponseEdge{
    id: string;
    user : UserTask;
    taskTemplate : TaskTemplate;
    execution : Executions;
}
interface UserTask
{
    firstName : string;
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