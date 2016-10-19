import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as config from '../../config';

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
        this.jsessionid = this.generateUUID();
        this.csrf_token = this.generateUUID();
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

        // let options = new RequestOptions({ headers: headers });
        var url = config.AUTHY_VER_URL + cellPhone + '?via=' + via;

        // var retval1 = this.http.post(url, params, { headers: headers });
        var retval1 = this.http.get(url);
        
        // body, options

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
