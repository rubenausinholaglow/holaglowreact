import {  TaskResponseNode } from "../TaskQueryResponse";
import { UsersResponseNode } from "../UserQueryResponse";

    export const mapUserData = (usersData: UsersResponseNode[]): UsersResponseNode[] => {
        return usersData.map(user => {
            const lastLead = user.leads[user.leads.length - 1];
            const lastAppointment = lastLead
            ? lastLead.appointments[lastLead.appointments.length - 1]
            : null;
            const lastName = user.secondLastName
            ? `${user.lastName} ${user.secondLastName}`
            : user.lastName;

            return {
            ...user,
            lastName,
            lastLead,
            lastAppointment,
            };
        });
    };

    export const isValidDate = (dateString: string): boolean => {
        return dateString !== '0001-01-01T00:00:00';
    }

    const calculateDuration = (task: TaskResponseNode): string => {
        if(isValidDate(task.completedTime.toString()))
        {
            const completedTime = new Date(task.completedTime);
            const creationDate = new Date(task.creationDate);
            
            const durationMs =    completedTime.getTime() - creationDate.getTime()
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
            
            return  `${hours}h ${minutes}m ${seconds}s`;
        }
        
        return '';

    }

    export const mapTasksData = (TaskData: TaskResponseNode[]): TaskResponseNode[] => {
        
        return TaskData.map(task => {
            const lastName = task.user.secondLastName
                ? `${task.user.lastName} ${task.user.secondLastName}`
                : task.user.lastName;

            const durationtime = calculateDuration(task);

            return {
                ...task,
                lastName,
                durationTime: durationtime || '' // Set to empty string if durationTime is falsy
            };
        });
    }