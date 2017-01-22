import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map'
import {Spieler} from "../domain/spieler";

@Injectable()
export class AuthenticationService {
  public token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentUser: BehaviorSubject<Spieler> = new BehaviorSubject<Spieler>(null);

  private spielerAPIUrl = 'http://localhost:42382/api/players';
  private headers = new Headers({ 'Content-Type': 'application/json'});

  constructor(private http: Http) {
    var pl = localStorage.getItem('currentUser');
    this.currentUser = new BehaviorSubject<Spieler>(JSON.parse(pl));
  }

  login(nickname: string, password: string): Observable<boolean> {
    let body = JSON.stringify({ Nickname: nickname, HashedPassword: password });

    return this.http.post(this.spielerAPIUrl + '/auth', body,  { headers: this.headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the respons
        let responseObj = response.json();

        if (!responseObj.Player || !responseObj.Token) {
          return false;
        }
        else {
          // set token property
          this.token.next(responseObj.Token);
          this.currentUser.next(responseObj.Player);

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(responseObj.Player));
          console.log("player: ", responseObj.Player)

          console.log("token: ", responseObj.Token);
          localStorage.setItem('token', responseObj.Token);

          // return true to indicate successful login
          return true;
        }
      });
  }

  logout(): void {
    this.token.next(null);
    this.currentUser.next(null);
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}

class ResponseObject
{
  public Token: string = "";

  public Player: Spieler = new Spieler();
}
