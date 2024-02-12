import { PageInfo } from "./PageInfo";

export type UserQueryResponse = {
    users : UsersResponse;
    
}

export type UsersResponse = {
    edges : UserResponsesEdges[];
    pageInfo : PageInfo;
    totalCount : number;
}
export type UserResponsesEdges = {
    node : UsersResponseNode;
}

export type UsersResponseNode = {
    id : string;
    email : string;
    firstName : string;
    lastName : string;
    secondLastName :string;
    phone : string;
    agent : AgentUserResponse;
    leads : LeadsUserResponse[];
}

type AgentUserResponse = {
    username : string;
}

type LeadsUserResponse = {
    id : string;
    creationDate : Date;
    appointments : AppointmentUserResponse[];
}

type AppointmentUserResponse = {
    id : string;
    creationDate : Date;
    clinic : ClinicUserResponse;
}

type ClinicUserResponse = {
    city : string;
}