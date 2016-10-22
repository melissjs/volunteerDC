import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as config from '../../config';
import { Volunteer} from '../../volunteer';

let authyURL = config.AUTHY_VER_URL;

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {

    jsessionid: string;
    csrf_token: string;

    constructor(private http: Http) {
        // generate values
        this.jsessionid = null;// this.generateUUID();
        this.csrf_token = null;// this.generateUUID();
    }

    generateUUID(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    sendAuthyRequest(via: string, cellPhone: string) {

        // let options = new RequestOptions({ headers: null, withCredentials: true});
        var url = config.AUTHY_VER_URL + cellPhone + '?via=' + via;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options
        var that = this;
        /* var retval1b = retval1.subscribe((res) => {
           that.csrf_token = res.headers.get('CSRF-TOKEN');
           });*/

        var retval2 = retval1.map(
            res => res.json()
        );
        return retval2;
        // .catch(this.handleError);
    }
    
    sendAuthyVerify(cellPhone: string, code: string) {

        // let options = new RequestOptions({ headers: headers });
        var url = config.AUTHY_CHK_URL + cellPhone + '/' + code;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

        var retval2 = retval1.map(
            res => res.json()
        );
        return retval2;
        // .catch(this.handleError);
    }
    
    cacheBuster() {
        var now = new Date().getTime();
        var retval = '?cacheBuster=' + now;
        return retval;
    }

    registerUser(nv: Volunteer) {
        var blankIdx = nv.fullName.indexOf(" ");
        var firstName = null;
        var lastName = null;
        if (blankIdx < 1) {
            // no last name specified..
            firstName = nv.fullName;
        } else {
            firstName = nv.fullName.substring(0,blankIdx);
            lastName = nv.fullName.substring(blankIdx+1);
        }
        var property = 
            { "login": nv.phoneNumber, "firstName": firstName, "lastName": lastName,
              "email": nv.emailAddress, "password": nv.passcode, "langKey": "en" };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        headers.append('Accept', 'application/json, text/plain, */*');
        if (this.csrf_token != null) {
            headers.append('X-CSRF-TOKEN', this.csrf_token);
        }
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        var url = config.MT_HOST + '/api/register' + this.cacheBuster();
        var retval1 = this.http.post(url, params, options);
        // body, options
        var retval2 = retval1.map(res => res.json());
        return retval2;
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error' + error.toString());
    }

    anonSignin() {
        var property = 
            { "withCredentials": "true", "j_username": "anon", "j_password": "anon", "remember-me" : "true"
            };
        var json = JSON.stringify(property);
        var params = /* 'json=' +  */ json;
        let headers = new Headers();
        /* headers.append('Access-Control-Allow-Origin', '*');
           headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
           headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        */
        headers.append('Content-Type', 'application/json');

        // let options = new RequestOptions({ headers: headers });
        var url = config.MT_HOST + '/api/authentication';
        var retval1 = this.http.post(url, params, { headers: headers })
        
        // body, options

        var retval2 = retval1.map(res => res.json());
        return retval2;
    }
}
