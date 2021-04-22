import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";
import { of } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class SearchService {

    baseUrl = "/service/map";

    static SEARCH_URL = "service/map/search";

    static SEARCH_REGION = '/service/map/searchregion';

    static PARAMS = new HttpParams({
        fromObject: {
            format: "json"
        }
    });

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };


    constructor(private http: HttpClient) { }

    search(term: string) {
        if (term === "") {
            return of([]);
        }

        return this.http
            .get(SearchService.SEARCH_URL, { params: SearchService.PARAMS.set("key", term) })
            .pipe(map(response => response));
    }

    getRegions(term: string): Observable<any[]> {

        return this.http
            .get<any[]>(SearchService.SEARCH_URL, { params: SearchService.PARAMS.set("key", term) })
            .pipe(map(response => response)).pipe(
                catchError(this.errorHandler),
            );;
    }

    getCARS(term: string): Observable<any[]> {

        return this.http
            .get<any[]>(this.baseUrl + '/cars', { params: SearchService.PARAMS.set("key", term) })
            .pipe(map(response => response)).pipe(
                catchError(this.errorHandler),
            );;
    }

    getRegionByGeocodigo(term: string): Observable<any[]> {

        return this.http
            .get<any[]>(this.baseUrl + '/cdgeocmu', { params: SearchService.PARAMS.set("key", term) })
            .pipe(map(response => response)).pipe(
                catchError(this.errorHandler),
            );;
    }

    getCoordinatePoint(term: string): Observable<any[]> {

        return this.http
            .get<any[]>(this.baseUrl + '/cars', { params: SearchService.PARAMS.set("key", term) })
            .pipe(map(response => response)).pipe(
                catchError(this.errorHandler),
            );;
    }

    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }


}