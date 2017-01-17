import {Injectable, Input, ElementRef} from '@angular/core';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';


import { Spieler } from "../domain/spieler";


@Injectable()
export class SpielerService {

  private spielerAPIUrl = 'http://localhost:42382/api/players';
  private headers = new Headers({ 'Content-Type': 'application/json'});


  constructor(public http: Http) { }

  FindById(id: number): Promise<Spieler> {
    const url = this.spielerAPIUrl + '/' + id;
    const get= this.http.get(url);
    return get
      .toPromise()
      .then(response => response.json() as Spieler)
      .catch(this.handleError);
  }

  FindAll(): Promise<Spieler[]>{
    return this.http.get(this.spielerAPIUrl)
      .toPromise()
      .then(response => response.json() as Spieler[])
      .catch(this.handleError);
  }

  DeleteById(id: number) {
    const url = `${this.spielerAPIUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  DeleteAll(){
    const url = this.spielerAPIUrl;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  Insert(spieler: Spieler){
    return this.http
      .post(this.spielerAPIUrl, JSON.stringify(spieler), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  Update(spieler: Spieler): Promise<Spieler> {
    const url = `${this.spielerAPIUrl}/${spieler.ID}`;
    return this.http
      .put(url, JSON.stringify(spieler), { headers: this.headers })
      .toPromise()
      .then(() => spieler)
      .catch(this.handleError);
  }


  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
