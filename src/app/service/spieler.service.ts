import {Injectable, Input, ElementRef} from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs} from "@angular/http";

import 'rxjs/add/operator/toPromise';


import { Spieler } from "../domain/spieler";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class SpielerService {

  private spielerAPIUrl = 'http://localhost:42382/api/players';


  private headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization': JSON.stringify(this.authenticationService.token.getValue().Token)
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
      'Authorization': JSON.stringify(this.authenticationService.token.getValue().Token)
    });
  }

  FindById(id: number): Promise<Spieler> {
    const url = this.spielerAPIUrl + '/' + id;
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    const get= this.http.get(url, options);
    return get
      .toPromise()
      .then(response => response.json() as Spieler)
      .catch(this.handleError);
  }

  FindAll(): Promise<Spieler[]>{
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.spielerAPIUrl, options)
      .toPromise()
      .then(response => response.json() as Spieler[])
      .catch(this.handleError);
  }

  FindByDay(date: Date): Promise<Spieler[]>{
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(this.spielerAPIUrl + '/byday/' + date.toDateString(), options)
      .toPromise()
      .then(response => {
        return response.json() as Spieler[];
      })
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    const url = `${this.spielerAPIUrl}/${id}`;
    return this.http.delete(url, options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    const url = this.spielerAPIUrl;
    return this.http.delete(url, options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(spieler: Spieler){
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    return this.http
      .post(this.spielerAPIUrl, JSON.stringify(spieler), options)
      .toPromise()
      .catch(this.handleError);
  }

  Update(spieler: Spieler): Promise<Spieler> {
    this.makeHeader();
    let options = new RequestOptions({ headers: this.headers });
    const url = `${this.spielerAPIUrl}/${spieler.ID}`;
    return this.http
      .put(url, JSON.stringify(spieler), options)
      .toPromise()
      .then(() => spieler)
      .catch(this.handleError);
  }


  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
