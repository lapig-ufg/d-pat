import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppConfig {

    urls: any[] = null;

    constructor(private http: HttpClient) {

    }

    load() {
        return this.http.get('/service/map/getowsdomain')
            .toPromise()
            .then((resp: any[]) => {
                this.urls = resp;
            });
    }

}