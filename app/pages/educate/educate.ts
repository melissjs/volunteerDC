import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headerc} from '../headerc/headerc';

import {InstructionsPage} from '../instructions/instructions';
import {FaqsPage} from '../faqs/faqs';
import {VideosPage} from '../videos/videos';




@Component({
  templateUrl: 'build/pages/educate/educate.html',
  directives: [Headerc],
})
export class EducatePage {
   titlec: {page: any, title: string};

   constructor(private navCtrl: NavController, navParams: NavParams) {
       this.titlec = { page: navParams.get("menupg"), title: navParams.get("title") };
       this.navCtrl = navCtrl;
   }

   onSubmitInstructions(){
        var that = this;
        try {
            
                that.navCtrl.push(InstructionsPage, {
                    title: 'Instructions',
                    menupg: this.titlec.page
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
   }

   onSubmitFAQs(){
        var that = this;
        try {
            
                that.navCtrl.push(FaqsPage, {
                    title: 'FAQs',
                    menupg: this.titlec.page
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

    onSubmitVideos(){
        var that = this;
        try {
            
                that.navCtrl.push(VideosPage, {
                    title: 'Videos',
                    menupg: this.titlec.page
                });
            
        } catch (EE) {
            console.log('error in Submitting, exc='+ EE.toString())
        }
  }

}
