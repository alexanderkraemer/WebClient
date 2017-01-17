import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class UploadService {
  private spielerAPIUrl = 'http://localhost:42382/api/players';

  constructor(private http: Http) { }

  upload(fileToUpload: any, nickname: string) {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.http
      .post( this.spielerAPIUrl + "/photo/" + nickname , input);
  }
}
