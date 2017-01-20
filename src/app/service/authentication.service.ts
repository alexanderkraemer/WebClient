import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map'
import {Spieler} from "../domain/spieler";

@Injectable()
export class AuthenticationService {
  public token: BehaviorSubject<ResponseObject> = new BehaviorSubject<ResponseObject>(null);
  private spielerAPIUrl = 'http://localhost:42382/api/players';
  private headers = new Headers({ 'Content-Type': 'application/json'});

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token.next(currentUser);
  }

  login(nickname: string, password: string): Observable<boolean> {
    let body = JSON.stringify({ Nickname: nickname, HashedPassword: password });

    return this.http.post(this.spielerAPIUrl + '/auth', body,  { headers: this.headers })
      .map((response: Response) => {
      console.log("response: ", response.json() as ResponseObject);

        // login successful if there's a jwt token in the response

        let responseObj = response.json();

        if (responseObj) {
          // set token property
          this.token.next(responseObj);

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(responseObj));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    this.token.next(null);
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

class ResponseObject
{
  public Token: string = "";

  public Player: Spieler = new Spieler();
}
