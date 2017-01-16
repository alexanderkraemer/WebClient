import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';


import { Spieler } from "../domain/spieler";


@Injectable()
export class SpielerService {

  private spielerAPIUrl = 'http://localhost:42382/api/players';
  private headers = new Headers({ 'Content-Type': 'application/json'});


  constructor(public http: Http) { }

  getSpieler(id: number): Promise<Spieler> {
    const url = `${this.spielerAPIUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Spieler)
      .catch(this.handleError);
  }

  FindAll(){

  }

  DeleteById(id: number) {

  }

  DeleteAll(){

  }

  Insert(spieler: Spieler){

  }

  Update(spieler: Spieler){

  }


  private handleError(error:any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
