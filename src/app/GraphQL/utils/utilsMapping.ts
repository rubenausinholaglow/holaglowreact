import {  TaskResponseNode } from "../TaskQueryResponse";
import { UsersResponseNode } from "../UserQueryResponse";

    export const mapUserData = (usersData: UsersResponseNode[]): UsersResponseNode[] => {
        return usersData.map(user => {
           
            const lastName = user.secondLastName
            ? `${user.lastName} ${user.secondLastName}`
            : user.lastName;

          
            let lastAppointment = null;
            let lastLead = null;

            if (user.leads && user.leads.length > 0) {
                const sortedLeads = user.leads.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                const leadWithAppointments = sortedLeads.find(lead => lead.appointments && lead.appointments.length > 0); 

                if (leadWithAppointments && leadWithAppointments?.appointments.length > 0) {
                    lastLead = leadWithAppointments;
                    const sortedAppointments = leadWithAppointments.appointments.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                    lastAppointment = sortedAppointments[0];
                } else {
                    lastLead = sortedLeads[0];
                }
            }

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