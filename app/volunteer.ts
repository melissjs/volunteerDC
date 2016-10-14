import { PollingStation} from './pollingstation.ts';

export interface Volunteer {
fullName: string;
emailAddress: string;
exposeEmail: boolean;
phoneNumber: string;
age: number;
sex: string;
partyAffiliation: string;
shifts?: string[];
passcode: string;
pollingStation?: PollingStation;
totalRecords: number;
totalVoteRecords: number;
totalAnomalyRecords: number;
totalAmendmentRecords: number;
} 