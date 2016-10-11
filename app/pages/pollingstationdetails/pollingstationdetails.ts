import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PollingstationComponent } from '../pollingstationcomponent/pollingstationcomponent';
import { Volunteer} from '../../volunteer.ts';
import { Team } from '../../team.ts';
import { PollingStation } from '../../pollingstation.ts';

import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice.ts';


@Component({
  templateUrl: 'build/pages/pollingstationdetails/pollingstationdetails.html',
  inputs: ['pollingstation', 'volunteer', 'team'],
  directives: [PollingstationComponent],
  providers: [Pollingstationservice]
})
export class PollingstationdetailsPage {
currentVolunteer: Volunteer; 
currentTeam: Team;
stations: PollingStation[];
  constructor(private navCtrl: NavController) {



this.stations =
      [{
        "precinctNumber": "9001A",
        "streetAddress": "515 Almont Drive",
        "unitNumber": "11",
        "roomNumber": "3",
        "city": "Los Angeles",
        "state": "California",
        "zip": 90025,
        "associatedVolunteerList": [{
                
        "fullName":"Melissa Schwartz",
        "emailAddress":"melissjs@gmail.com",
        "phoneNumber":"602-524-5453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Morning, Evening",
        "passcode": "Eric help me!",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      
        },      {
        "fullName":"Eric Hillis",
        "emailAddress":"eric@hillis.com",
        "phoneNumber":"310-222-3333",
        "age": 40,
        "sex": "Male",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Afternoon",
        "passcode": "Code",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      }],
        "totalRegisteredVolunteers": 2,
        "totalNeededVolunteers": 4
        
      },    {
        "precinctNumber": "9001b",
        "streetAddress": "5445 Roxbery Lane",
        "unitNumber": "11",
        "roomNumber": "2",
        "city": "Los Angeles",
        "state": "California",
        "zip": 90025,
        "associatedVolunteerList": [{
                
        "fullName":"Melissa Schwartz",
        "emailAddress":"melissjs@gmail.com",
        "phoneNumber":"602-524-5453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Morning, Evening",
        "passcode": "Eric help me!",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      
        },      {
        "fullName":"Eric Hillis",
        "emailAddress":"eric@hillis.com",
        "phoneNumber":"310-222-3333",
        "age": 40,
        "sex": "Male",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Afternoon",
        "passcode": "Code",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      }],
        "totalRegisteredVolunteers": 2,
        "totalNeededVolunteers": 4
      },      {
        "precinctNumber": "1001b",
        "streetAddress": "4209 Raymond Road",
        "unitNumber": "11",
        "roomNumber": "2",
        "city": "Marina Del Rey",
        "state": "California",
        "zip": 90025,
        "associatedVolunteerList": [{
                
        "fullName":"Melissa Schwartz",
        "emailAddress":"melissjs@gmail.com",
        "phoneNumber":"602-524-5453",
        "age": 35,
        "sex": "Female",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Morning, Evening",
        "passcode": "Eric help me!",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      
        },      {
        "fullName":"Eric Hillis",
        "emailAddress":"eric@hillis.com",
        "phoneNumber":"310-222-3333",
        "age": 40,
        "sex": "Male",
        "partyAffiliation": "No Party Preference",    
        "shifts": "Afternoon",
        "passcode": "Code",
        "totalRecords": 6,
        "totalVoteRecords": 5,
        "totalAnomalyRecords": 0,
        "totalAmendmentRecords": 1
      }],
        "totalRegisteredVolunteers": 2,
        "totalNeededVolunteers": 4
      }]


  }

}
