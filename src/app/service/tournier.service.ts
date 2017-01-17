import { Injectable } from '@angular/core';
import { Tournier } from '../domain/tournier';
import {Headers, Http} from "@angular/http";

@Injectable()
export class TournierService {

  private tournierAPIUrl = 'http://localhost:42382/api/tournaments';
  private headers = new Headers({ 'Content-Type': 'application/json'});


  constructor(public http: Http) { }

  FindById(id: number) {
    const url = this.tournierAPIUrl + '/' + id;
    const get= this.http.get(url);
    return get
      .toPromise()
      .then(response => response.json() as Tournier)
      .catch(this.handleError);
  }

  FindByDay(day: Date){
    const url = this.tournierAPIUrl + '/day/' + day;
    const get= this.http.get(url);
    return get
      .toPromise()
      .then(response => response.json() as Tournier)
      .catch(this.handleError);
  }

  FindAll(){
    return this.http.get(this.tournierAPIUrl)
      .toPromise()
      .then(response => response.json() as Tournier[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    const url = `${this.tournierAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    const url = this.tournierAPIUrl;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(tournier: Tournier){
    return this.http
      .post(this.tournierAPIUrl, JSON.stringify(tournier), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  Update(tournier: Tournier){
    const url = `${this.tournierAPIUrl}/${tournier.id}`;
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
