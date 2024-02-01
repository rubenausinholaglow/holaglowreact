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

type UsersResponseNode = {
    id : string;
    email : string;
    firstName : string;
    lastName : string;
    phone : string;
}
