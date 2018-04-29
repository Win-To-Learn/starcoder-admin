import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const generatorUrl = 'http://www.dinopass.com/password/simple';

@Injectable()
export class GeneratePasswordService {
    constructor(private http: HttpClient) { }

    getPassword (): Observable<string> {
        return this.http.get(generatorUrl, {responseType: 'text'});
    }
}