import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// interfaces
import { Volunteer} from '../../volunteer';
import { PollingStation } from '../../pollingstation';

// station json array
import { VOLUNTEERS } from '../../volunteerlist';
import * as globals from '../../globals';

//other service
import { Pollingstationservice } from '../../providers/pollingstationservice/pollingstationservice';



@Injectable()
export class Volunteerservice {
    currentVolunteer: Volunteer;
    exposedYesOrNo: string;
    oldStation: PollingStation;
    pollingstationservice: Pollingstationservice;
    volunteerListInMemory: Volunteer[];
    volunteersByStation: Volunteer[];
    buildString: string;
    notRegistered: string;
    associatedVolunteerArray: Volunteer[];
    tempVolunteer: Volunteer;

    constructor(pollingstationservice: Pollingstationservice) {
        this.currentVolunteer = null;
        this.pollingstationservice = pollingstationservice;
        this.volunteerListInMemory = VOLUNTEERS;
        this.notRegistered = "None";
        this.associatedVolunteerArray = [];
    }
    
    
    getVolunteers() { return this.volunteerListInMemory;  }

    generateVolunteerKey(){
        return 'v'+(this.volunteerListInMemory.length+1);
    }
    
    setNewVolunteer(value){
        var that = this;
        this.currentVolunteer = value;
    }

    getNewVolunteer(){
        return this.currentVolunteer;
    }

    setPollingStationForVolunteer(value){
        this.currentVolunteer.associatedPollingStationKey = value.pollingStationKey;
    }

    hasPollingStation(passedVolunteer){
        if(this.currentVolunteer.associatedPollingStationKey != null)
            return true;
    }

    clearShifts() {
        this.currentVolunteer.shifts = '';
    }

    setShifts(passedString){
        //this.currentVolunteer.shifts = passedString;
        if (!this.currentVolunteer.shifts.includes(passedString)) {
            if (this.currentVolunteer.shifts != '') {
                this.currentVolunteer.shifts = this.currentVolunteer.shifts + ", " + passedString;
            } else {
                this.currentVolunteer.shifts = passedString;
            }
        }
    }

    printVolunteer(passedVolunteer){
    console.log('Name: ' + passedVolunteer.fullName + ' Email: ' + passedVolunteer.emailAddress + ' Exposed: ' + passedVolunteer.exposeEmail + ' Cell: ' + passedVolunteer.phoneNumber + ' Age: ' + passedVolunteer.age + ' Sex: ' + passedVolunteer.sex + ' Party: ' + passedVolunteer.partyAffiliation + ' Shifts: ' + passedVolunteer.shifts+ ' Code: ' + passedVolunteer.passcode);
    }


    printShifts(passedVolunteer){
        if (this.currentVolunteer.shifts != '') {
            return this.currentVolunteer.shifts;
        } else {
            console.log(this.notRegistered);
            return this.notRegistered;
        }
    }
    

    addCurrentVolunteerToList(passedVolunteer){
        this.volunteerListInMemory.push(passedVolunteer);
    }

    deleteCurrentVolunteerFromList(passedVolunteer){
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                this.volunteerListInMemory.splice(i,1);
            } else { console.log("The volunteer was not in the list.")}
        } 
    }






    overWriteChangesToVolunteer(passedVolunteer){
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (passedVolunteer.volunteerKey == this.volunteerListInMemory[i].volunteerKey){
                this.volunteerListInMemory[i] = passedVolunteer;
                //console.log(passedVolunteer.volunteerKey + " matches " + this.volunteerListInMemory[i].volunteerKey);
            } else { //console.log(passedVolunteer.volunteerKey + " is not " + this.volunteerListInMemory[i].volunteerKey);
            
        }
        } 
    }


    isEmailExposed(passedVolunteer){
        this.currentVolunteer = passedVolunteer;
        if(this.currentVolunteer.exposeEmail == true){
            this.exposedYesOrNo = "Yes";
        }

        if(this.currentVolunteer.exposeEmail == false){
            this.exposedYesOrNo = "No";
        }
        return this.exposedYesOrNo;
    } 

    getVolunteerbyKey(passedKey){ 
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            if (this.volunteerListInMemory[i].volunteerKey == passedKey){
                return this.volunteerListInMemory[i]
            }
        }
        return null;
    }
    
    getVolunteersByStationAndShift(selectedStationKey, passedShift){
        var volunteersByStationAndShift = [];
        for (var i = 0; i < this.volunteerListInMemory.length; i++){
            var vol = this.volunteerListInMemory[i];
            if ((vol.associatedPollingStationKey == selectedStationKey) && 
                (vol.shifts.includes(passedShift))) {
                volunteersByStationAndShift.push(vol);
            }
        }
        return volunteersByStationAndShift;
    }


    getVolunteerArrayByKeyList(passedKeyList){
        for ( var i=0; i < passedKeyList.length; i++){
            this.tempVolunteer = this.getVolunteerbyKey(passedKeyList[i]);
            this.associatedVolunteerArray.push(this.tempVolunteer);
        }
        return this.associatedVolunteerArray;
    }

    printVolunteerKeysFromList(){
         for ( var i=0; i < this.volunteerListInMemory.length; i++){
             console.log(this.volunteerListInMemory[i].fullName);
             console.log(this.volunteerListInMemory[i].volunteerKey);
         }
    }

    // begin shifts


    checkEarlyMorning(passedShifts){
        return (passedShifts.includes(globals.EARLY_MORNING));
    }

    checkLateMorning(passedShifts){
        return (passedShifts.includes(globals.LATE_MORNING));
    }

    checkEarlyAfternoon(passedShifts){
        return (passedShifts.includes(globals.EARLY_AFTERNOON));
    }

    checkLateAfternoon(passedShifts){
        return (passedShifts.includes(globals.LATE_AFTERNOON));
    }

    checkEarlyEvening(passedShifts){
        return (passedShifts.includes(globals.EARLY_EVENING));
    }

    checkLateEvening(passedShifts){
        return (passedShifts.includes(globals.LATE_EVENING));
    }
}


