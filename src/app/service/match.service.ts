import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Match} from "../domain/match";

@Injectable()
export class MatchService {

  private matchAPIUrl = 'http://localhost:42382/api/matches';
  private headers = new Headers({ 'Content-Type': 'application/json'});


  constructor(public http: Http) { }

  FindById(id: number): Promise<Match> {
    const url = this.matchAPIUrl + '/' + id;
    const get= this.http.get(url);
    return get
      .toPromise()
      .then(response => response.json() as Match)
      .catch(this.handleError);
  }

  FindAll(): Promise<Match[]>{
    return this.http.get(this.matchAPIUrl)
      .toPromise()
      .then(response => response.json() as Match[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    const url = `${this.matchAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    const url = this.matchAPIUrl;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(spieler: Match){
    return this.http
      .post(this.matchAPIUrl, JSON.stringify(spieler), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Update(match: Match): Promise<Match> {
    const url = `${this.matchAPIUrl}/${match.ID}`;
    return this.http
      .put(url, JSON.stringify(match), { headers: this.headers })
      .toPromise()
      .then(() => match)
      .catch(this.handleError);
  }


  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
