import { Volunteer} from './volunteer.ts';

export interface PollingStation {
precinctNumber: string;
streetAddress: string;
unitNumber?: string;
roomNumber?: string;
city: string;
state: string;
zip: number;
associatedVolunteerList?: Volunteer[];
totalRegisteredVolunteers?: number;
totalNeededVolunteers?: number;
}  