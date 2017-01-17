import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Spieler} from "../../../domain/spieler";
import {SpielerService} from "../../../service/spieler.service";

import {Location} from '@angular/common';
import {UploadService} from "../../../service/upload.service";

@Component({
  moduleId: module.id,
  selector: 'app-spieler-create',
  templateUrl: 'spieler-create.component.html',
  styleUrls: ['spieler-create.component.css']
})

export class SpielerCreateComponent implements OnInit{

  constructor(
    private spielerService: SpielerService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    var s = new Spieler();
    this.spieler = s;
  }


  cancel(): void {
    this.location.back();
  }


  save(spieler: Spieler): void {
    this.spielerService.Insert(spieler)
      .then(() => this.cancel());
  }

  uploadfile(file: any): void {
    let fi = file.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService
        .upload(fileToUpload, this.spieler.Nickname)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  enableSubmit()
  {
    if(this.spieler.Password
    && this.spieler.FirstName
    && this.spieler.LastName
    && this.spieler.Nickname
    && this.spieler.Password == this.passwordConfirm
    )
    {
      this.buttonEnabled = true;
    }
    else {
      this.buttonEnabled = false;
    }
  }

  checkPassword(){
    if(this.spieler.Password == this.passwordConfirm){
      this.passwordConfirmLabel = "Password matches!";
    }
    else{
      this.passwordConfirmLabel = "Password does not match!";
    }
    this.enableSubmit();
  }

  public spieler: Spieler;
  passwordConfirm : string;
  passwordConfirmLabel : string = "";
  buttonEnabled : boolean = false;


  private file: File;

}
