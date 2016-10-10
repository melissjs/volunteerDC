export interface PollingStation {
precinctNumber: string;
streetAddress: string;
unitNumber?: string;
roomNumber?: string;
city: string;
state: string;
zip: number;
associatedVolunteerList: any[];
totalRegisteredVolunteers: number;
totalNeededVolunteers: number;
}  