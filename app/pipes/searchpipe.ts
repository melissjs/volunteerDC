import { Injectable, Pipe } from '@angular/core';

//providers
//import { Pollingstationservice } from '../providers/pollingstationservice/pollingstationservice.ts';

/*
  Generated class for the Searchpipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'searchpipe'
})
@Injectable()
export class Searchpipe {

//pollingstationservice: Pollingstationservice;


transform(pipeData, [pipeModifier]){
  //this.pollingstationservice = pollingstationservice;
  return pipeData.filter((eachItem)=>{
    return eachItem['streetAddress'].toLowerCase().includes(pipeModifier.toLowerCase()) ||                
           eachItem['zip'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
           eachItem['city'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
           eachItem['state'].toLowerCase().includes(pipeModifier.toLowerCase()); 
  });
  }
}




 
   // Takes a value and makes it lowercase. Came with pipe genrated page, keeping for reference
   
 /*transform(value: string, args: any[]) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }*/

 // pollingstationservice.passedStations.

