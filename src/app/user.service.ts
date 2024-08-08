import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCache = new Map<number, any>();
  private apiUrl = 'https://reqres.in/api/users';
  search$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}?page=${page}`)
      .pipe(catchError(this.handleError('getUsers', [])));
  }

  getUser(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    } else {
      return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        tap((user) => this.userCache.set(id, user)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            // Return null for 404 errors
            return of(null);
          }
          return this.handleError('getUser', {})(error);
        })
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log the error but avoid showing it in the console
      if (!(error instanceof HttpErrorResponse && error.status === 404)) {
        console.error(`${operation} failed: ${error.message}`);
      }
      return of(result as T);
    };
  }
}
