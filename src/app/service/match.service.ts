import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Match} from "../domain/match";
import {Spieler} from "../domain/spieler";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class MatchService {

  private matchAPIUrl = 'http://localhost:42382/api/matches';
  private headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.token.getValue()
    });
  constructor(
    public http: Http,
    private authenticationService: AuthenticationService
  ) {
  }

  private makeHeader()
  {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.token.getValue()
    });
  }

  FindById(id: number): Promise<Match> {
    this.makeHeader();
    const url = this.matchAPIUrl + '/' + id;
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Match)
      .catch(this.handleError);
  }

  FindAllByPage(page: number, numberPerPage: number): Promise<MatchPaginateClass>{
    this.makeHeader();
    return this.http.get(this.matchAPIUrl + '/page/' + page + '/' + numberPerPage, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as MatchPaginateClass)
      .catch(this.handleError);
  }

  FindAll(): Promise<Match[]>{
    this.makeHeader();
    return this.http.get(this.matchAPIUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Match[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    this.makeHeader();
    const url = `${this.matchAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    this.makeHeader();
    const url = this.matchAPIUrl;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(spieler: Match){
    this.makeHeader();
    return this.http
      .post(this.matchAPIUrl, JSON.stringify(spieler), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Generate(numberToGenerate: number, playerList: Spieler[], tournamentId:number){
    this.makeHeader();
    let mg = new MatchGenerate();
    mg.chosenPlayers = playerList;
    mg.NumberOfMatches = numberToGenerate;
    mg.tournamentId = tournamentId;

    return this.http
      .post(this.matchAPIUrl + '/generate', JSON.stringify(mg), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Update(match: Match): Promise<Match> {
    this.makeHeader();
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

export class MatchPaginateClass
{
  public numberOfMatches: number;
  public matchList: Match[];
}


class MatchGenerate
{
  public chosenPlayers: Spieler[];
  public NumberOfMatches: number;
  public tournamentId: number;
}
