import { Injectable } from '@angular/core';
import {Statistik} from "../domain/statistik";
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class StatistikService {

  private statistikAPIUrl = 'http://localhost:42382/api/statistics';
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

  FindById(id: number) {
    this.makeHeader();
    const url = this.statistikAPIUrl + '/' + id;
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Statistik)
      .catch(this.handleError);
  }

  FindByPlayer(player_id: number){
    this.makeHeader();
    const url = this.statistikAPIUrl + '/player/' + player_id;
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Statistik)
      .catch(this.handleError);
  }

  FindByDay(day: Date){
    this.makeHeader();
    const url = this.statistikAPIUrl + '/day/' + day;
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Statistik)
      .catch(this.handleError);
  }

  FindAll(){
    this.makeHeader();
    return this.http.get(this.statistikAPIUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Statistik[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    this.makeHeader();
    const url = `${this.statistikAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(statistik: Statistik){
    this.makeHeader();
    return this.http
      .post(this.statistikAPIUrl, JSON.stringify(statistik), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Update(statistik: Statistik){
    this.makeHeader();
    const url = `${this.statistikAPIUrl}/${statistik.id}`;
    return this.http
      .put(url, JSON.stringify(statistik), { headers: this.headers })
      .toPromise()
      .then(() => statistik)
      .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}


export class StatisticPlayerObj{
  labels: Date[];
  date: number[];
}
