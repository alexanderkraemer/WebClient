import { Injectable } from '@angular/core';
import { Tournier } from '../domain/tournier';
import {Headers, Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class TournierService {

  private tournierAPIUrl = 'http://localhost:42382/api/tournaments';
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
    const url = this.tournierAPIUrl + '/' + id;
    this.makeHeader();
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Tournier)
      .catch(this.handleError);
  }

  FindByDay(date: Date){
    const url = this.tournierAPIUrl + '/day/' + date.toDateString();
    this.makeHeader();
    const get= this.http.get(url, { headers: this.headers });
    return get
      .toPromise()
      .then(response => response.json() as Tournier[])
      .catch(this.handleError);
  }

  FindAll(){
    this.makeHeader();
    return this.http.get(this.tournierAPIUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Tournier[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    this.makeHeader();
    const url = `${this.tournierAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    this.makeHeader();
    const url = this.tournierAPIUrl;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(tournier: Tournier){
    this.makeHeader();
    return this.http
      .post(this.tournierAPIUrl, JSON.stringify(tournier), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Update(tournier: Tournier): Promise<boolean>{
    this.makeHeader();
    const url = `${this.tournierAPIUrl}/${tournier.ID}`;
    return this.http
      .put(url, JSON.stringify(tournier), { headers: this.headers })
      .toPromise()
      .then(() => tournier)
      .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
