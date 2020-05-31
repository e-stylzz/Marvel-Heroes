import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeroes(limit: number, offset: number): Observable<any> {
    const url = '/api/hero?limit='+limit+'&offset='+offset;
    console.log('Calling: ', url);
    return this.http.get<any>(url).pipe(catchError(this._handleError));
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }
}
