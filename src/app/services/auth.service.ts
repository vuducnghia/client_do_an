import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

const apiUrl = 'http://localhost:8081/api/auth';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>; // component to reactively update when a user logs in or out

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    const msg = error.error.message || 'Something bad happened; please try again later.';

    // return an observable with a user-facing error message
    return throwError(msg);
  }

  // property can be used when you just want to get the current value of the logged in user but don't need to
  // reactively update when it changes
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginUser(user) {
    console.log(user)
    return this.http.post<any>(`${apiUrl}/signinUser`, user)
      .pipe(map(user => {
        if (user && user.token && user.role === 'user') {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          document.cookie = `Authorization=${user.token}`;
          this.currentUserSubject.next(user);
        }
        console.log(user)
        return user;
      }), catchError(this.handleError));
  }

  loginAdmin(user) {
    console.log(user)
    return this.http.post<any>(`${apiUrl}/signinAdmin`, user)
      .pipe(map(user => {
        if (user && user.token && user.role !== 'user') {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          document.cookie = `Authorization=${user.token}`;
          this.currentUserSubject.next(user);
        }
        console.log(user)
        return user;
      }), catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
